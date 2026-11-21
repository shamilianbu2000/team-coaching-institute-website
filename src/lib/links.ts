import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/content/site";

export const telHref = `tel:${SITE.phoneTel}`;

export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
