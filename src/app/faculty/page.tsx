import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Section, Pending } from "@/components/ui/ui";
import { EnquiryCta, FacultyGrid } from "@/components/sections/sections";

export const metadata: Metadata = pageMetadata({
  title: "Faculty",
  description: "The teaching team at TEAM Coaching Institute, Jayankondam. Faculty profiles will be published once confirmed by the institute.",
  path: "/faculty",
});

export default function FacultyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Faculty", path: "/faculty" }])} />
      <PageHero eyebrow="Faculty" title="The people who teach" intro="Reviewers describe the teaching as clear, simple and easy to follow, even for average students." />
      <Section tone="cream">
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-sun-600 bg-sun-100 p-4 text-navy">
          <Pending />
          <p className="text-sm">Names, photographs, qualifications, subjects and experience will be shown only after the institute approves them.</p>
        </div>
        <FacultyGrid limit={3} />
      </Section>
      <EnquiryCta />
    </>
  );
}
