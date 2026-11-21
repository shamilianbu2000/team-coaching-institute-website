"use client";

import type { ReactNode } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/content/site";
import { telHref, whatsappHref } from "@/lib/links";
import { track } from "@/lib/analytics";
import { buttonClass, btnVariants } from "@/components/ui/ui";

type Variant = keyof typeof btnVariants;

export function CallButton({ variant = "navy", className, children }: { variant?: Variant; className?: string; children?: ReactNode }) {
  return (
    <a href={telHref} onClick={() => track("phone_click", { location: "button" })} className={buttonClass(variant, className)}>
      <Phone className="size-5" aria-hidden="true" />
      {children ?? `Call ${SITE.phoneDisplay}`}
    </a>
  );
}

export function WhatsAppButton({
  variant = "primary",
  className,
  message,
  children,
}: {
  variant?: Variant;
  className?: string;
  message?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "button" })}
      className={buttonClass(variant, className)}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      {children ?? "WhatsApp Us"}
    </a>
  );
}

export function DirectionsButton({ variant = "outline", className, children }: { variant?: Variant; className?: string; children?: ReactNode }) {
  return (
    <a
      href={SITE.googleDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("directions_click", { location: "button" })}
      className={buttonClass(variant, className)}
    >
      <MapPin className="size-5" aria-hidden="true" />
      {children ?? "Get Directions"}
    </a>
  );
}
