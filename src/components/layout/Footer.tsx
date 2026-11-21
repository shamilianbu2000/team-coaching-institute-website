import Link from "next/link";
import { ADDRESS_ONE_LINE, NAV_LINKS, PENDING_LABEL, SITE } from "@/content/site";
import { telHref } from "@/lib/links";
import { Brand } from "@/components/layout/Header";
import { Container } from "@/components/ui/ui";
import { CurrentYear } from "@/components/ui/CurrentYear";

export function Footer() {
  const social = Object.entries(SITE.social).filter(([, url]) => url) as [string, string][];
  return (
    <footer className="bg-navy-900 text-white/80">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.3fr]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-sm leading-relaxed">
            Tuition and coaching centre in Jayankondam, Ariyalur district, for school students and competitive-exam aspirants.
          </p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-4">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold capitalize text-sun hover:underline">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 font-heading text-base font-bold !text-white">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="inline-flex min-h-11 items-center hover:text-sun">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className="mb-4 font-heading text-base font-bold !text-white">Visit &amp; contact</h2>
          <p className="leading-relaxed">{ADDRESS_ONE_LINE}</p>
          <p className="mt-3">
            <a href={telHref} className="inline-flex min-h-11 items-center font-bold text-sun hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
          <p>Open until {SITE.hours.closes}</p>
          <p className="mt-1 text-sm text-white/60">Opening time: {PENDING_LABEL.toLowerCase()}</p>
        </address>
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        <Container>
          © <CurrentYear /> {SITE.name}. Details on this site are based on public listings and are being confirmed with the
          institute.
        </Container>
      </div>
    </footer>
  );
}
