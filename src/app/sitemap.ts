import type { MetadataRoute } from "next";
import { COURSES } from "@/content/courses";
import { absoluteUrl } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/classes", "/faculty", "/results", "/testimonials", "/gallery", "/contact", "/privacy-policy"];
  // Fixed content date: update when site content changes (avoids reading the clock at build time).
  const now = new Date("2026-11-21");
  return [
    ...staticRoutes.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...COURSES.map((c) => ({ url: absoluteUrl(`/classes/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
