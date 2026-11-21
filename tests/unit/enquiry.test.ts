import { describe, expect, it, vi } from "vitest";
import { enquirySchema, normalizeMobile, submitEnquiry } from "@/lib/enquiry";

const valid = { parentName: "Murugan", studentName: "Priya", mobile: "98765 43210", studentClass: "Class 10" };

describe("enquirySchema", () => {
  it("accepts a valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });
  it.each(["9876543210", "+91 98765 43210", "91-9876543210", "09876543210"])("accepts mobile %s", (mobile) => {
    expect(enquirySchema.safeParse({ ...valid, mobile }).success).toBe(true);
  });
  it.each(["12345", "5876543210", "98765432", "abcdefghij", "98765432101"])("rejects mobile %s", (mobile) => {
    expect(enquirySchema.safeParse({ ...valid, mobile }).success).toBe(false);
  });
  it("requires parent name, student name, mobile and class", () => {
    const r = enquirySchema.safeParse({ parentName: "", studentName: "", mobile: "", studentClass: "" });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(r.error.flatten().fieldErrors).sort()).toEqual(["mobile", "parentName", "studentClass", "studentName"]);
  });
  it("rejects a filled honeypot", () => {
    expect(enquirySchema.safeParse({ ...valid, _gotcha: "bot" }).success).toBe(false);
  });
  it("normalizes mobile numbers", () => {
    expect(normalizeMobile("+91 98765-43210")).toBe("+919876543210");
  });
});

describe("submitEnquiry", () => {
  const values = enquirySchema.parse(valid);

  it("never fakes success when Formspree is not configured", async () => {
    const f = vi.fn();
    const r = await submitEnquiry("", values, f as unknown as typeof fetch);
    expect(r).toMatchObject({ ok: false, reason: "not-configured" });
    expect(f).not.toHaveBeenCalled();
  });
  it("treats the placeholder endpoint as not configured", async () => {
    const r = await submitEnquiry("YOUR_FORMSPREE_ENDPOINT", values, vi.fn() as unknown as typeof fetch);
    expect(r).toMatchObject({ ok: false, reason: "not-configured" });
  });
  it("posts JSON to the endpoint and reports success on 2xx", async () => {
    const f = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    const r = await submitEnquiry("https://formspree.io/f/abc", values, f as unknown as typeof fetch);
    expect(r).toEqual({ ok: true });
    const [url, init] = f.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/abc");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)["Parent mobile"]).toBe("9876543210");
  });
  it("reports Formspree errors", async () => {
    const f = vi.fn().mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: "Form not found" }] }), { status: 404 }));
    const r = await submitEnquiry("https://formspree.io/f/abc", values, f as unknown as typeof fetch);
    expect(r).toMatchObject({ ok: false, reason: "rejected", message: "Form not found" });
  });
  it("reports network failures", async () => {
    const f = vi.fn().mockRejectedValue(new TypeError("offline"));
    const r = await submitEnquiry("https://formspree.io/f/abc", values, f as unknown as typeof fetch);
    expect(r).toMatchObject({ ok: false, reason: "network" });
  });
});
