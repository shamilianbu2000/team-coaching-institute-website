import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Pending, Section } from "@/components/ui/ui";
import { CourseCard, EnquiryCta } from "@/components/sections/sections";
import { COURSES } from "@/content/courses";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Classes & Courses",
  description:
    "Classes and courses at TEAM Coaching Institute, Jayankondam: school tuition (Classes 8–12), NEET coaching, competitive-exam preparation and crash courses.",
  path: "/classes",
});

export default function ClassesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Classes", path: "/classes" }])} />
      <PageHero
        eyebrow="Classes & courses"
        title="Programmes for school students and exam aspirants"
        intro="Choose a programme to see how it works and enquire for admission."
      />
      <Section tone="cream">
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-sun-600 bg-sun-100 p-4 text-navy">
          <Pending />
          <p className="text-sm">
            Subjects, batch timings, fees and eligibility are not yet published by the institute. Classes 1–7 are not listed because no source
            confirms them.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="h-full">
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
      </Section>
      <EnquiryCta />
    </>
  );
}
