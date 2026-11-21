"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { SITE } from "@/content/site";
import { enquirySchema, submitEnquiry, type EnquiryValues } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/ui";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";

const CLASS_SUGGESTIONS = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "NEET aspirant", "Competitive exam aspirant"];

const field =
  "mt-1.5 block w-full min-h-12 rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-sun";

type Props = { endpoint?: string; defaultClass?: string };

export function EnquiryForm({ endpoint = SITE.formspreeEndpoint, defaultClass }: Props) {
  const configured = Boolean(endpoint) && endpoint !== "YOUR_FORMSPREE_ENDPOINT";
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: { studentClass: defaultClass ?? "" },
  });

  const onSubmit = async (values: EnquiryValues) => {
    setStatus("idle");
    const result = await submitEnquiry(endpoint, values);
    if (result.ok) {
      track("generate_lead", { form: "admission_enquiry" });
      setStatus("success");
      reset();
    } else {
      setErrorMsg(result.message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-sun/60 bg-sun-100 p-8 text-center" data-testid="enquiry-success">
        <CheckCircle2 className="mx-auto size-12 text-navy" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-extrabold">Thank you – enquiry received</h3>
        <p className="mt-2 text-muted">The institute will contact you on the mobile number you provided.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 min-h-12 rounded-full border-2 border-navy px-6 font-semibold text-navy hover:bg-navy hover:text-white">
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (name: keyof EnquiryValues) =>
    errors[name] && (
      <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
        {errors[name]?.message as string}
      </p>
    );
  const aria = (name: keyof EnquiryValues) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="@container space-y-5" aria-label="Admission enquiry form" data-testid="enquiry-form">
      {!configured && (
        <div role="note" className="flex gap-3 rounded-2xl border border-dashed border-sun-600 bg-sun-100 p-4 text-sm text-navy">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Online form not connected yet.</strong> Formspree has not been configured, so enquiries cannot be sent from this form.
            Please call or message us on WhatsApp.
          </p>
        </div>
      )}

      <div className="grid gap-5 @md:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="text-sm font-semibold text-navy">Parent name *</label>
          <input id="parentName" autoComplete="name" className={field} placeholder="e.g. Murugan" {...register("parentName")} {...aria("parentName")} />
          {err("parentName")}
        </div>
        <div>
          <label htmlFor="studentName" className="text-sm font-semibold text-navy">Student name *</label>
          <input id="studentName" autoComplete="off" className={field} placeholder="e.g. Priya" {...register("studentName")} {...aria("studentName")} />
          {err("studentName")}
        </div>
        <div>
          <label htmlFor="mobile" className="text-sm font-semibold text-navy">Parent mobile number *</label>
          <input
            id="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={field}
            placeholder="10-digit mobile number"
            {...register("mobile")}
            {...aria("mobile")}
          />
          {err("mobile")}
        </div>
        <div>
          <label htmlFor="studentClass" className="text-sm font-semibold text-navy">Student class *</label>
          <input
            id="studentClass"
            list="class-suggestions"
            autoComplete="off"
            className={field}
            placeholder="e.g. Class 10"
            {...register("studentClass")}
            {...aria("studentClass")}
          />
          <datalist id="class-suggestions">
            {CLASS_SUGGESTIONS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {err("studentClass")}
        </div>
      </div>

      <div>
        <label htmlFor="subjects" className="text-sm font-semibold text-navy">Interested subjects <span className="font-normal text-muted">(optional)</span></label>
        <input id="subjects" className={field} placeholder="e.g. Maths, Science" {...register("subjects")} {...aria("subjects")} />
        {err("subjects")}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-navy">Additional message <span className="font-normal text-muted">(optional)</span></label>
        <textarea id="message" rows={4} className={cx(field, "resize-y")} placeholder="Anything you'd like us to know" {...register("message")} {...aria("message")} />
        {err("message")}
      </div>

      {/* Honeypot spam trap – hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" type="text" tabIndex={-1} autoComplete="off" {...register("_gotcha")} />
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-800" data-testid="enquiry-error">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !configured}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-navy px-8 text-lg font-bold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-5" aria-hidden="true" /> Submit enquiry
          </>
        )}
      </button>

      <p className="text-sm text-muted">
        Your details are used only to respond to this enquiry. See our <a className="font-semibold text-navy underline" href="/privacy-policy">Privacy Policy</a>.
      </p>

      {!configured && (
        <div className="flex flex-wrap gap-3">
          <CallButton />
          <WhatsAppButton variant="outline" />
        </div>
      )}
    </form>
  );
}
