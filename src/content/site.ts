/**
 * Single source of truth for business details.
 * Verified values come from the client's public listings (see docs/CLIENT_RESEARCH.md).
 * Anything unknown is `null` and rendered as "Client confirmation required".
 */
export const SITE = {
  name: "TEAM Coaching Institute",
  shortName: "TEAM Institute",
  tagline: "Building Strong Foundations. Creating Brighter Futures.",
  description:
    "TEAM Coaching Institute is a tuition and coaching centre in Jayankondam, Ariyalur district, Tamil Nadu, offering academic guidance for school students and competitive-exam aspirants.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",

  // Contact (phone verified from Google Maps; override with env vars if needed)
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "063814 66472",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "+916381466472",
  // WhatsApp number in international format without "+". Defaults to the verified phone
  // number; the client must confirm it is WhatsApp-enabled.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "916381466472",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,

  address: {
    line1: "67B, 2nd Floor, Sannathi Street",
    landmark: "Near Shivan Kovil",
    locality: "Jayankondam",
    district: "Ariyalur",
    region: "Tamil Nadu",
    postalCode: "621802",
    country: "India",
    countryCode: "IN",
  },
  geo: { lat: 11.2115569, lng: 79.3621145 },
  plusCode: "6966+JR Jayankondam",

  hours: { closes: "9:30 PM", opens: null as string | null },

  // Google
  googleMapsUrl:
    "https://www.google.com/maps/place/TEAM+coaching+Institute/data=!4m2!3m1!1s0x0:0x9442b9733a92d26e?sa=X&ved=1t:2428&ictx=111",
  googleDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=11.2115569,79.3621145",
  googleMapsEmbed: "https://maps.google.com/maps?q=11.2115569,79.3621145&z=17&output=embed",
  googleRating: { value: "5.0", count: 59, asOf: "21 Nov 2026" },

  // Social profiles: none found. Fill via env when the client confirms them.
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? null,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? null,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? null,
  },

  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export const ADDRESS_ONE_LINE = `${SITE.address.line1}, ${SITE.address.landmark}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello TEAM Coaching Institute, I would like to enquire about student admissions. Please share the available classes, subjects and batch timings.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/faculty", label: "Faculty" },
  { href: "/results", label: "Results" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const PENDING_LABEL = "Client confirmation required";
