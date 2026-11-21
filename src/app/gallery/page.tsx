import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Pending, Section } from "@/components/ui/ui";
import { EnquiryCta, GalleryGrid } from "@/components/sections/sections";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "Photo gallery of TEAM Coaching Institute, Sannathi Street, Jayankondam – classrooms, study areas and activities.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <PageHero eyebrow="Gallery" title="Inside the institute" intro="A look at the learning space and activities." />
      <Section tone="cream">
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-sun-600 bg-sun-100 p-4 text-navy">
          <Pending>Photos to be provided</Pending>
          <p className="text-sm">Listing photos from third-party sites are not reused. Approved photos from the institute will replace these placeholders.</p>
        </div>
        <GalleryGrid />
      </Section>
      <EnquiryCta />
    </>
  );
}
