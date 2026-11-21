import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui/ui";
import { EnquiryFormSection, LocationBlock } from "@/components/sections/sections";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Admissions",
  description:
    "Contact TEAM Coaching Institute, Sannathi Street, Jayankondam, Ariyalur – call, WhatsApp, get directions or send an admission enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Contact & admissions" title="Let's talk about your child's learning" intro="Send an enquiry, call, or message us on WhatsApp." />
      <Section tone="cream">
        <div className="space-y-10">
          <EnquiryFormSection />
          <LocationBlock />
        </div>
      </Section>
    </>
  );
}
