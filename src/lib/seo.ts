import type { Metadata } from "next";
import { ADDRESS_ONE_LINE, SITE } from "@/content/site";
import { absoluteUrl } from "@/lib/links";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** EducationalOrganization + LocalBusiness. Deliberately has NO aggregateRating (self-serving reviews). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.landmark}`,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: [SITE.address.locality, `${SITE.address.district} district`],
    hasMap: SITE.googleMapsUrl,
    sameAs: [SITE.googleMapsUrl, ...Object.values(SITE.social).filter(Boolean)],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function courseJsonLd(course: { slug: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/classes/${course.slug}`),
    provider: { "@type": "EducationalOrganization", name: SITE.name, address: ADDRESS_ONE_LINE, url: SITE.url },
  };
}
