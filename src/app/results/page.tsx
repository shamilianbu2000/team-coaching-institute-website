import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui/ui";
import { AchievementsBlock, EnquiryCta } from "@/components/sections/sections";

export const metadata: Metadata = pageMetadata({
  title: "Results & Achievements",
  description: "Verified student results and achievements at TEAM Coaching Institute, Jayankondam – published only with the institute's confirmation.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Results", path: "/results" }])} />
      <PageHero eyebrow="Results & achievements" title="Student success, verified" intro="We publish real results only – never estimates or invented statistics." />
      <Section tone="cream"><AchievementsBlock /></Section>
      <EnquiryCta />
    </>
  );
}
