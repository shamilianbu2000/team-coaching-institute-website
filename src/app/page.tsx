import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";
import {
  AchievementsSection,
  CoursesSection,
  EnquiryCta,
  FacultyIntro,
  GallerySection,
  Hero,
  Intro,
  LocationSection,
  Methodology,
  ReviewsSection,
  SocialSection,
  WhyChoose,
} from "@/components/sections/sections";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "TEAM Coaching Institute – Tuition & Coaching in Jayankondam, Ariyalur",
    description:
      "TEAM Coaching Institute in Jayankondam, Ariyalur: tuition and coaching for school students and NEET / competitive-exam aspirants. Enquire for admission, call or WhatsApp.",
    path: "/",
  }),
  title: { absolute: "TEAM Coaching Institute – Tuition & Coaching in Jayankondam, Ariyalur" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <Intro />
      <CoursesSection />
      <WhyChoose />
      <Methodology />
      <FacultyIntro />
      <AchievementsSection />
      <ReviewsSection />
      <GallerySection />
      <SocialSection />
      <EnquiryCta />
      <LocationSection />
    </>
  );
}
