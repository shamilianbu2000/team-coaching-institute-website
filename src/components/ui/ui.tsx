import Link from "next/link";
import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { PENDING_LABEL } from "@/content/site";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-offset-4 active:scale-[0.98]";

export const btnVariants = {
  primary: "bg-sun text-navy shadow-sm hover:bg-sun-600 hover:shadow-md",
  navy: "bg-navy text-white hover:bg-navy-800",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  outlineLight: "border-2 border-white/70 text-white hover:bg-white hover:text-navy",
  ghost: "text-navy hover:bg-navy/5",
} as const;

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof btnVariants;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cx(btnBase, btnVariants[variant], className)}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: keyof typeof btnVariants = "primary", className?: string) =>
  cx(btnBase, btnVariants[variant], className);

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "cream",
  children,
  className,
}: {
  id?: string;
  tone?: "cream" | "white" | "navy";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    cream: "bg-cream",
    white: "bg-white",
    navy: "bg-navy text-white bg-dots",
  } as const;
  return (
    <section id={id} className={cx("py-16 sm:py-20", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cx("mb-3 text-sm font-bold uppercase tracking-[0.14em]", tone === "light" ? "text-sun" : "text-sun-600")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cx("text-3xl font-extrabold leading-tight sm:text-4xl", tone === "light" && "!text-white")}>{title}</h2>
      {intro && <p className={cx("mt-4 text-lg leading-relaxed", tone === "light" ? "text-white/80" : "text-muted")}>{intro}</p>}
    </div>
  );
}

export function Pending({ children = PENDING_LABEL, className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-sun-600 bg-sun-100 px-3 py-1 text-xs font-semibold text-navy",
        className,
      )}
    >
      <Info className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-navy bg-dots py-14 text-white sm:py-20">
      <Container>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-sun">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight !text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
      </Container>
    </section>
  );
}
