import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { COURSES, getCourse } from "@/content/courses";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, courseJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Pending, Section } from "@/components/ui/ui";
import { EnquiryFormSection } from "@/components/sections/sections";
import { CallButton, WhatsAppButton } from "@/components/ui/ContactActions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return pageMetadata({
    title: `${course.title} in Jayankondam`,
    description: `${course.summary} ${course.title} at TEAM Coaching Institute, Sannathi Street, Jayankondam, Ariyalur. Enquire for admission.`,
    path: `/classes/${course.slug}`,
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const facts: [string, string[] | string | null][] = [
    ["Subjects", course.subjects],
    ["Eligibility", course.eligibility],
    ["Batch timings", course.timings],
    ["Fees", course.fee],
  ];

  return (
    <>
      <JsonLd data={courseJsonLd(course)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Classes", path: "/classes" },
          { name: course.title, path: `/classes/${course.slug}` },
        ])}
      />
      <PageHero eyebrow={course.category} title={course.title} intro={course.summary} />
      <Section tone="cream">
        <Link href="/classes" className="mb-8 inline-flex min-h-11 items-center gap-2 font-bold text-navy hover:text-sun-600">
          <ArrowLeft className="size-4" aria-hidden="true" /> All classes
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold">About this programme</h2>
              <p className="mt-3 text-lg leading-relaxed">{course.description}</p>
              <p className="mt-2 text-sm text-muted">Audience: {course.audience}. Source: {course.source}.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Teaching approach</h2>
              <ul className="mt-4 space-y-3">
                {course.methodology.map((m) => (
                  <li key={m} className="flex gap-3 text-lg"><CheckCircle2 className="mt-1 size-5 shrink-0 text-sun-600" aria-hidden="true" />{m}</li>
                ))}
              </ul>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-5">
                  <dt className="text-sm font-bold uppercase tracking-wide text-sun-600">{k}</dt>
                  <dd className="mt-1 font-medium">{v ? (Array.isArray(v) ? v.join(", ") : v) : <Pending />}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <WhatsAppButton message={`Hello TEAM Coaching Institute, I would like to enquire about ${course.title}. Please share the subjects, batch timings and fees.`} variant="outline" />
            </div>
          </div>
          <EnquiryFormSection defaultClass="" />
        </div>
      </Section>
    </>
  );
}
