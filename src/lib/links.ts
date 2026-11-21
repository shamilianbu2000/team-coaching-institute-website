import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/content/site";

export const telHref = `tel:${SITE.phoneTel}`;

export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL for canonical/sitemap/schema. Adds a trailing slash when the static export serves pages as `/path/`. */
export const absoluteUrl = (path = "/") => {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = process.env.NEXT_PUBLIC_TRAILING_SLASH === "1" && !p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p);
  return `${SITE.url}${withSlash ? `${p}/` : p}`;
};
