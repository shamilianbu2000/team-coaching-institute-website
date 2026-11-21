import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui/ui";
import { EnquiryCta, GoogleReviewsCard, TestimonialsBlock } from "@/components/sections/sections";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials & Google Reviews",
  description: "What students and parents say about TEAM Coaching Institute, Jayankondam – 5.0 on Google Maps (59 reviews as shown).",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Testimonials", path: "/testimonials" }])} />
      <PageHero eyebrow="Testimonials" title="What families say" intro="Real feedback lives on Google – read it there, in the reviewers' own words." />
      <Section tone="cream">
        <GoogleReviewsCard />
        <div className="mt-10"><TestimonialsBlock /></div>
        <p className="mt-8 max-w-2xl text-sm text-muted">
          Parent and student quotes or video testimonials will be added here only with written permission from the people concerned.
        </p>
      </Section>
      <EnquiryCta />
    </>
  );
}
