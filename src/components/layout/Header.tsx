"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/content/site";
import { telHref } from "@/lib/links";
import { track } from "@/lib/analytics";
import { cx } from "@/components/ui/ui";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} – home`}>
      <span className="grid size-11 place-items-center rounded-xl bg-navy font-heading text-lg font-extrabold text-sun" aria-hidden="true">
        T
      </span>
      <span className="whitespace-nowrap leading-tight">
        <span className={cx("block font-heading text-lg font-extrabold tracking-tight", light ? "text-white" : "text-navy")}>TEAM</span>
        <span className={cx("block text-[0.7rem] font-semibold uppercase tracking-[0.16em]", light ? "text-white/70" : "text-muted")}>
          Coaching Institute
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Esc closes, body scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-sun focus:px-4 focus:py-2 focus:font-semibold focus:text-navy">
        Skip to content
      </a>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Brand />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cx(
                    "relative rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                    isActive(l.href) ? "bg-navy text-white" : "text-navy hover:bg-navy/5",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            onClick={() => track("phone_click", { location: "header" })}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-sun px-5 text-sm font-bold text-navy hover:bg-sun-600 sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="grid size-12 place-items-center rounded-full border-2 border-navy text-navy xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-navy px-5 pb-28 pt-6 xl:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cx(
                    "flex min-h-14 items-center rounded-xl px-4 text-xl font-bold",
                    isActive(l.href) ? "bg-sun text-navy" : "text-white hover:bg-white/10",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid gap-3">
          <Link
            href="/contact#enquiry"
            onClick={() => setOpen(false)}
            className="flex min-h-14 items-center justify-center rounded-full bg-sun text-lg font-bold text-navy"
          >
            Enquire for Admission
          </Link>
          <a
            href={telHref}
            onClick={() => track("phone_click", { location: "menu" })}
            className="flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-white/70 text-lg font-bold text-white"
          >
            <Phone className="size-5" aria-hidden="true" /> Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
