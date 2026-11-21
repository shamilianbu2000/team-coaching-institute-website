import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Pending, Section, SectionHeading } from "@/components/ui/ui";
import { EnquiryCta, Methodology, WhyChoose } from "@/components/sections/sections";
import { ADDRESS_ONE_LINE, SITE } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "About TEAM Coaching Institute, a tuition and coaching centre on Sannathi Street, Jayankondam, Ariyalur: our approach, learning environment and what families say.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title="A focused tuition and coaching centre in Jayankondam"
        intro="TEAM Coaching Institute supports school students and competitive-exam aspirants with clear teaching, regular practice and study guidance."
      />
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            <SectionHeading eyebrow="Who we are" title="Learning that builds understanding" />
            <p>
              TEAM Coaching Institute is a tuition and coaching centre located at {ADDRESS_ONE_LINE}. It provides coaching and academic support
              through subject-focused classes, exam preparation, study guidance and practice sessions.
            </p>
            <p>
              Students and parents who have reviewed the institute on Google highlight clear, step-by-step explanations, supportive staff,
              confidence building and good infrastructure.
            </p>
          </div>
          <aside className="space-y-4 rounded-3xl border border-line bg-white p-6">
            <h2 className="text-xl font-extrabold">Institute at a glance</h2>
            <dl className="space-y-3">
              <div><dt className="text-sm font-bold uppercase tracking-wide text-sun-600">Location</dt><dd>{SITE.address.locality}, {SITE.address.district} district, {SITE.address.region}</dd></div>
              <div><dt className="text-sm font-bold uppercase tracking-wide text-sun-600">Hours</dt><dd>Open until {SITE.hours.closes}</dd></div>
              <div><dt className="text-sm font-bold uppercase tracking-wide text-sun-600">Founder / management</dt><dd><Pending /></dd></div>
              <div><dt className="text-sm font-bold uppercase tracking-wide text-sun-600">Year established</dt><dd><Pending /></dd></div>
            </dl>
          </aside>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Vision & mission" title="What the institute stands for" />
        <div className="grid gap-5 md:grid-cols-2">
          {["Vision", "Mission"].map((t) => (
            <div key={t} className="rounded-3xl border border-dashed border-sun-600 bg-cream p-6">
              <h3 className="text-xl font-extrabold">{t}</h3>
              <p className="mt-2 text-muted">The institute has not shared an official {t.toLowerCase()} statement yet.</p>
              <div className="mt-3"><Pending /></div>
            </div>
          ))}
        </div>
      </Section>

      <Methodology />
      <WhyChoose />
      <Section tone="white">
        <SectionHeading eyebrow="Facilities" title="Learning environment" />
        <div className="rounded-3xl border border-line bg-cream p-6 text-lg">
          <p>The institute is on the second floor at Sannathi Street, near Shivan Kovil. Reviewers describe the infrastructure as good.</p>
          <p className="mt-3 text-muted">A detailed facilities list (classrooms, library, seating capacity, etc.) will be added after the client confirms it.</p>
          <div className="mt-3"><Pending /></div>
        </div>
      </Section>
      <EnquiryCta />
    </>
  );
}
