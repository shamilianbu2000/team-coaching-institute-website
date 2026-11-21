"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/content/site";
import { telHref, whatsappHref } from "@/lib/links";
import { track } from "@/lib/analytics";

const item =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-bold active:bg-white/10";

/** Fixed bottom actions, shown below the md breakpoint only. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/15 bg-navy pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-6px_20px_rgba(13,29,51,0.25)] md:hidden"
    >
      <a href={telHref} onClick={() => track("phone_click", { location: "mobile_bar" })} className={item} aria-label={`Call ${SITE.phoneDisplay}`}>
        <Phone className="size-5 text-sun" aria-hidden="true" />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
        className={`${item} border-x border-white/15`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-5 text-sun" aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={SITE.googleDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("directions_click", { location: "mobile_bar" })}
        className={item}
        aria-label="Get directions on Google Maps"
      >
        <MapPin className="size-5 text-sun" aria-hidden="true" />
        Directions
      </a>
    </nav>
  );
}
