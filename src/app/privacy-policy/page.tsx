import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/ui";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS_ONE_LINE, SITE } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How TEAM Coaching Institute handles information submitted through this website's admission enquiry form.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated: 21 November 2026. This is a plain-language summary; the institute should review it before launch." />
      <Section tone="cream">
        <div className="max-w-3xl space-y-8 text-lg leading-relaxed [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-extrabold">
          <section><h2>Who we are</h2><p>{SITE.name}, {ADDRESS_ONE_LINE}. Phone: {SITE.phoneDisplay}.</p></section>
          <section>
            <h2>Information we collect</h2>
            <p>When you submit the admission enquiry form we receive: parent name, student name, parent mobile number, student class and any optional subjects or message you choose to enter.</p>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>Only to respond to your enquiry about admissions, classes and batch timings. We do not sell your information or use it for unrelated marketing.</p>
          </section>
          <section>
            <h2>Form processing</h2>
            <p>Enquiries are delivered by Formspree (formspree.io), a third-party form service, to the institute&apos;s email. Formspree processes the data on our behalf under its own privacy policy.</p>
          </section>
          <section>
            <h2>Analytics</h2>
            <p>If Google Analytics 4 is enabled, it records anonymous usage such as pages viewed and button clicks (form submission, call, WhatsApp, directions). It is off unless configured.</p>
          </section>
          <section>
            <h2>Third-party links</h2>
            <p>Links to Google Maps, WhatsApp and similar services are governed by those providers&apos; policies.</p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>To ask us to correct or delete an enquiry you submitted, call {SITE.phoneDisplay}.</p>
          </section>
        </div>
      </Section>
    </>
  );
}
