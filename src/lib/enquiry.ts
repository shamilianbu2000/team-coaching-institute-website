import { z } from "zod";

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. */
export const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export const normalizeMobile = (value: string) => value.replace(/[\s-]/g, "");

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Please enter the parent's name").max(80, "Name is too long"),
  studentName: z.string().trim().min(2, "Please enter the student's name").max(80, "Name is too long"),
  mobile: z
    .string()
    .trim()
    .min(1, "Please enter a mobile number")
    .refine((v) => INDIAN_MOBILE.test(normalizeMobile(v)), "Enter a valid 10-digit Indian mobile number"),
  studentClass: z.string().trim().min(1, "Please enter the student's class").max(40, "Too long"),
  subjects: z.string().trim().max(200, "Please keep this under 200 characters").optional(),
  message: z.string().trim().max(1000, "Please keep this under 1000 characters").optional(),
  // Honeypot: real users never fill this. Formspree also treats `_gotcha` as spam trap.
  _gotcha: z.string().max(0).optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network" | "rejected"; message: string };

/**
 * Posts an enquiry to Formspree. Never reports success unless Formspree answered 2xx.
 * `endpoint` is NEXT_PUBLIC_FORMSPREE_ENDPOINT; empty means the form is not configured yet.
 */
export async function submitEnquiry(
  endpoint: string,
  values: EnquiryValues,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint || endpoint === "YOUR_FORMSPREE_ENDPOINT") {
    return {
      ok: false,
      reason: "not-configured",
      message: "The online enquiry form is not connected yet. Please call or message us on WhatsApp.",
    };
  }

  const payload = {
    "Parent name": values.parentName,
    "Student name": values.studentName,
    "Parent mobile": normalizeMobile(values.mobile),
    "Student class": values.studentClass,
    "Interested subjects": values.subjects ?? "",
    Message: values.message ?? "",
    _gotcha: values._gotcha ?? "",
    _subject: "New admission enquiry – TEAM Coaching Institute",
  };

  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };

    let detail = "";
    try {
      const body = (await res.json()) as { errors?: { message?: string }[]; error?: string };
      detail = body.errors?.map((e) => e.message).filter(Boolean).join(" ") || body.error || "";
    } catch {
      /* non-JSON error body */
    }
    return {
      ok: false,
      reason: "rejected",
      message: detail || "We couldn't send your enquiry. Please try again, or call us directly.",
    };
  } catch {
    return {
      ok: false,
      reason: "network",
      message: "Network problem – your enquiry was not sent. Please check your connection and try again, or call us.",
    };
  }
}
