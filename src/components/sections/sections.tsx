import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, ExternalLink, GraduationCap, MapPin, Clock, Phone, Star, UserRound, Award, Quote } from "lucide-react";
import { ADDRESS_ONE_LINE, PENDING_LABEL, SITE } from "@/content/site";
import { COURSES, type Course } from "@/content/courses";
import {
  ACHIEVEMENTS,
  FACULTY,
  GALLERY_ITEMS,
  METHODOLOGY,
  REVIEW_THEMES,
  TESTIMONIALS,
  WHY_CHOOSE,
} from "@/content/general";
import { telHref } from "@/lib/links";
import { Container, LinkButton, Pending, Section, SectionHeading, cx } from "@/components/ui/ui";
import { CallButton, DirectionsButton, WhatsAppButton } from "@/components/ui/ContactActions";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";

/* ------------------------------------------------------------------ Hero */
function HeroArt() {
  return (
    <svg viewBox="0 0 420 360" role="img" aria-label="Illustration of an open book, graduation cap and a rising path" className="h-auto w-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4B544" />
          <stop offset="1" stopColor="#F9D78C" />
        </linearGradient>
      </defs>
      <circle cx="210" cy="180" r="150" fill="#1b3a5f" />
      <circle cx="210" cy="180" r="112" fill="#142b49" stroke="#F4B544" strokeOpacity=".35" strokeDasharray="4 8" />
      <path d="M110 232 C150 212 185 214 210 232 C235 214 270 212 310 232 L310 250 C270 232 235 234 210 252 C185 234 150 232 110 250 Z" fill="#fff" />
      <path d="M210 232 V252" stroke="#142b49" strokeWidth="3" />
      <path d="M150 140 L210 112 L270 140 L210 168 Z" fill="url(#g1)" />
      <path d="M180 156 V184 C180 196 240 196 240 184 V156 L210 170 Z" fill="#F4B544" fillOpacity=".85" />
      <path d="M270 140 V176" stroke="#F4B544" strokeWidth="4" strokeLinecap="round" />
      <circle cx="270" cy="182" r="6" fill="#F4B544" />
      <g fill="#F4B544">
        <path d="M92 92 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z" />
        <path d="M332 70 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" opacity=".8" />
        <circle cx="344" cy="258" r="5" opacity=".7" />
        <circle cx="86" cy="270" r="4" opacity=".7" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy bg-dots text-white">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sun">
            <MapPin className="size-4" aria-hidden="true" />
            Tuition &amp; coaching centre · Jayankondam, Ariyalur
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] !text-white sm:text-5xl lg:text-6xl">
            Building Strong Foundations. <span className="text-sun">Creating Brighter Futures.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Quality academic guidance and personalised learning for school students and competitive-exam aspirants, taught step by step by a
            supportive team.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold" aria-label="Programmes">
            {["School tuition", "NEET coaching", "Competitive exams", "Crash course"].map((t) => (
              <li key={t} className="rounded-full border border-white/25 px-3 py-1.5 text-white/90">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/classes" variant="primary">
              Explore Our Classes <ArrowRight className="size-5" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/contact#enquiry" variant="outlineLight">
              Enquire for Admission
            </LinkButton>
          </div>
          <p className="mt-4 text-sm text-white/60">Programme details are being confirmed with the institute – please call for the latest information.</p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <HeroArt />
          <a
            href={SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-2 left-1/2 flex w-[92%] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-4 text-navy shadow-xl transition hover:-translate-y-0.5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun-100" aria-hidden="true">
              <Star className="size-6 fill-sun text-sun" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-extrabold">{SITE.googleRating.value} on Google</span>
              <span className="block text-sm text-muted">{SITE.googleRating.count} reviews, as shown on Google Maps</span>
            </span>
            <ExternalLink className="ml-auto size-4 text-muted" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-navy-900/60">
        <Container className="grid gap-4 py-5 text-sm sm:grid-cols-3">
          <p className="flex items-center gap-3"><MapPin className="size-5 shrink-0 text-sun" aria-hidden="true" /><span>Sannathi Street, near Shivan Kovil, Jayankondam</span></p>
          <p className="flex items-center gap-3"><Clock className="size-5 shrink-0 text-sun" aria-hidden="true" /><span>Open until {SITE.hours.closes}</span></p>
          <p className="flex items-center gap-3"><Phone className="size-5 shrink-0 text-sun" aria-hidden="true" /><a href={telHref} className="font-semibold hover:underline">{SITE.phoneDisplay}</a></p>
        </Container>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Intro */
export function Intro() {
  return (
    <Section tone="cream">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="About the institute"
            title="A focused place to learn, close to home"
            intro="TEAM Coaching Institute is a tuition and coaching centre on Sannathi Street in Jayankondam. It offers coaching and academic support to school students and competitive-exam aspirants through subject-focused classes, exam preparation, study guidance and practice sessions."
          />
          <LinkButton href="/about" variant="navy">
            More about us <ArrowRight className="size-5" aria-hidden="true" />
          </LinkButton>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid gap-4 rounded-3xl border border-line bg-white p-6 sm:grid-cols-2">
            {[
              ["Category", "Tuition & coaching centre"],
              ["Location", "Jayankondam, Ariyalur district, Tamil Nadu 621802"],
              ["Hours", `Open until ${SITE.hours.closes}`],
              ["Established", PENDING_LABEL],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm font-bold uppercase tracking-wide text-sun-600">{k}</dt>
                <dd className="mt-1 font-medium text-navy">{v === PENDING_LABEL ? <Pending /> : v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Courses */
export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="grid size-12 place-items-center rounded-2xl bg-navy text-sun" aria-hidden="true">
        <GraduationCap className="size-6" />
      </span>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-sun-600">{course.category}</p>
      <h3 className="mt-1 text-xl font-extrabold">{course.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{course.summary}</p>
      <div className="mt-4"><Pending>Details to be confirmed</Pending></div>
      <Link
        href={`/classes/${course.slug}`}
        className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-navy hover:text-sun-600"
      >
        View details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CoursesSection({ limit }: { limit?: number }) {
  const list = limit ? COURSES.slice(0, limit) : COURSES;
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Classes & courses"
          title="Programmes for school and competitive exams"
          intro="Based on public information about the institute. Exact classes, subjects, timings and fees are being confirmed."
        />
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06} className="h-full">
            <CourseCard course={c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ Why choose */
export function WhyChoose() {
  return (
    <Section tone="navy">
      <Reveal>
        <SectionHeading
          tone="light"
          eyebrow="Why choose us"
          title="What students and parents say they value"
          intro="Themes below are paraphrased from public Google Maps reviews – see them in full on Google."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06} className="h-full">
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-sun text-navy" aria-hidden="true">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold !text-white">{title}</h3>
              <p className="mt-2 leading-relaxed text-white/75">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Methodology */
export function Methodology() {
  return (
    <Section tone="cream">
      <Reveal>
        <SectionHeading
          eyebrow="Teaching methodology"
          title="How learning happens"
          intro="The institute's public listing describes subject-focused classes, exam preparation, study guidance and practice sessions."
        />
      </Reveal>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {METHODOLOGY.map(({ icon: Icon, title, text }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="h-full">
              <div className="relative h-full rounded-3xl border border-line bg-white p-6">
                <span className="absolute right-5 top-4 font-heading text-4xl font-extrabold text-sun/40" aria-hidden="true">{i + 1}</span>
                <Icon className="size-8 text-navy" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* --------------------------------------------------------------- Faculty */
export function FacultyGrid({ limit = 3 }: { limit?: number }) {
  if (FACULTY.length > 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FACULTY.map((f) => (
          <article key={f.name} className="rounded-3xl border border-line bg-white p-6">
            <h3 className="text-xl font-extrabold">{f.name}</h3>
            <p className="font-semibold text-sun-600">{f.role}</p>
            <p className="mt-2 text-muted">{f.qualification}</p>
            <p className="text-muted">{f.experience}</p>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: limit }).map((_, i) => (
        <article key={i} className="rounded-3xl border border-dashed border-sun-600 bg-white p-6 text-center">
          <span className="mx-auto grid size-24 place-items-center rounded-full bg-cream text-navy/40" aria-hidden="true">
            <UserRound className="size-12" />
          </span>
          <h3 className="mt-4 text-lg font-extrabold">Faculty profile {i + 1}</h3>
          <p className="mt-1 text-sm text-muted">Name, qualification, subjects and experience</p>
          <div className="mt-3"><Pending /></div>
        </article>
      ))}
    </div>
  );
}

export function FacultyIntro() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Faculty"
          title="Meet the teaching team"
          intro="Reviewers describe the teachers as clear, patient and approachable. Faculty names, qualifications and experience will be published once the institute provides them."
        />
      </Reveal>
      <FacultyGrid />
      <div className="mt-8"><LinkButton href="/faculty" variant="outline">Faculty page <ArrowRight className="size-5" aria-hidden="true" /></LinkButton></div>
    </Section>
  );
}

/* ---------------------------------------------------------- Achievements */
export function AchievementsBlock() {
  if (ACHIEVEMENTS.length > 0) {
    return (
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => (
          <li key={a.title} className="rounded-3xl border border-line bg-white p-6">
            <Award className="size-8 text-sun-600" aria-hidden="true" />
            <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
            <p className="mt-1 text-muted">{a.detail}</p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="rounded-3xl border border-dashed border-sun-600 bg-white p-8 text-center">
      <Award className="mx-auto size-12 text-navy/40" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-extrabold">Results and achievements coming soon</h3>
      <p className="mx-auto mt-2 max-w-xl text-muted">
        We publish only verified results – exam scores, awards and success stories shared by the institute with student and parent consent.
        Nothing is shown here until then.
      </p>
      <div className="mt-4"><Pending /></div>
    </div>
  );
}

export function AchievementsSection() {
  return (
    <Section tone="cream">
      <Reveal>
        <SectionHeading eyebrow="Results & achievements" title="Student success, verified" />
      </Reveal>
      <AchievementsBlock />
    </Section>
  );
}

/* ---------------------------------------------------------- Testimonials */
export function GoogleReviewsCard() {
  return (
    <div className="rounded-3xl bg-navy p-8 text-white bg-dots sm:p-10">
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="font-heading text-6xl font-extrabold text-sun">{SITE.googleRating.value}</p>
          <div className="mt-1 flex gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-sun text-sun" aria-hidden="true" />)}
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">{SITE.googleRating.count} reviews on Google Maps</p>
          <p className="text-sm text-white/70">As shown on {SITE.googleRating.asOf}. The live number may have changed.</p>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/70">Common themes in reviews</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {REVIEW_THEMES.map((t) => <li key={t} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">{t}</li>)}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={SITE.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun px-6 font-bold text-navy hover:bg-sun-600"
        >
          Read all reviews on Google <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function TestimonialsBlock() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {TESTIMONIALS.map((t) => (
        <figure key={t.author} className="rounded-3xl border border-line bg-white p-6">
          <Quote className="size-8 text-sun" aria-hidden="true" />
          <blockquote className="mt-3 text-lg leading-relaxed">{t.quote}</blockquote>
          <figcaption className="mt-4 font-semibold text-navy">{t.author} <span className="font-normal text-muted">· {t.role}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading eyebrow="Google reviews" title="Trusted by students and parents" intro="We link to the real reviews instead of copying them." />
      </Reveal>
      <GoogleReviewsCard />
    </Section>
  );
}

/* --------------------------------------------------------------- Gallery */
export function GalleryGrid({ limit }: { limit?: number }) {
  const items = limit ? GALLERY_ITEMS.slice(0, limit) : GALLERY_ITEMS;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {items.map((g, i) => (
        <li
          key={g.title}
          className={cx(
            "relative overflow-hidden rounded-3xl border border-line bg-white",
            i === 0 && "col-span-2 lg:col-span-1 lg:row-span-2",
          )}
        >
          {g.src ? (
            <Image src={g.src} alt={g.alt ?? g.title} width={800} height={600} loading="lazy" className="aspect-[4/3] size-full object-cover" />
          ) : (
            <div className={cx("grid place-items-center bg-gradient-to-br from-navy to-navy-800 p-6 text-center text-white", i === 0 ? "aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-80" : "aspect-[4/3]")}>
              <div>
                <Camera className="mx-auto size-8 text-sun" aria-hidden="true" />
                <p className="mt-2 font-heading font-bold !text-white">{g.title}</p>
                <p className="mt-1 text-xs text-white/70">{g.caption}</p>
                <p className="mt-2 text-xs font-semibold text-sun">Photo to be provided</p>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function GallerySection() {
  return (
    <Section tone="cream">
      <Reveal>
        <SectionHeading eyebrow="Gallery" title="Inside the institute" intro="Authentic classroom and campus photos will replace these placeholders once approved by the institute." />
      </Reveal>
      <GalleryGrid limit={6} />
      <div className="mt-8"><LinkButton href="/gallery" variant="outline">Open gallery <ArrowRight className="size-5" aria-hidden="true" /></LinkButton></div>
    </Section>
  );
}

/* ---------------------------------------------------------------- Social */
export function SocialSection() {
  const social = Object.entries(SITE.social).filter(([, u]) => u) as [string, string][];
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading eyebrow="Stay connected" title="Follow TEAM Coaching Institute" />
      </Reveal>
      {social.length > 0 ? (
        <ul className="flex flex-wrap gap-3">
          {social.map(([name, url]) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 font-bold capitalize text-navy hover:bg-navy hover:text-white">
                {name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="max-w-2xl rounded-3xl border border-dashed border-sun-600 bg-cream p-6">
          <p className="text-muted">
            No official Instagram, YouTube or Facebook page was found for the institute. Links will appear here once the client shares them.
          </p>
          <div className="mt-3"><Pending /></div>
        </div>
      )}
      <div className="mt-6">
        <a href={SITE.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 font-bold text-navy underline hover:text-sun-600">
          Find us on Google Maps <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Enquiry CTA */
export function EnquiryCta() {
  return (
    <Section tone="navy">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight !text-white sm:text-4xl">Ready to enquire about admission?</h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Send a short enquiry, call, or message us on WhatsApp. We will share the available classes, subjects and batch timings.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <LinkButton href="/contact#enquiry" variant="primary">Fill the enquiry form</LinkButton>
          <WhatsAppButton variant="outlineLight" />
          <CallButton variant="outlineLight" />
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- Location */
export function LocationBlock() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold">Find us</h2>
        <address className="mt-4 space-y-3 not-italic text-lg">
          <p className="flex gap-3"><MapPin className="mt-1 size-5 shrink-0 text-sun-600" aria-hidden="true" />{ADDRESS_ONE_LINE}</p>
          <p className="flex gap-3"><Phone className="mt-1 size-5 shrink-0 text-sun-600" aria-hidden="true" /><a className="font-semibold text-navy underline" href={telHref}>{SITE.phoneDisplay}</a></p>
          <p className="flex gap-3"><Clock className="mt-1 size-5 shrink-0 text-sun-600" aria-hidden="true" /><span>Open until {SITE.hours.closes}</span></p>
        </address>
        <p className="mt-3 text-sm text-muted">Opening time and email: <Pending className="ml-1" /></p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CallButton />
          <WhatsAppButton variant="primary" />
          <DirectionsButton />
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        <iframe
          title="Map showing TEAM Coaching Institute, Sannathi Street, Jayankondam"
          src={SITE.googleMapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full border-0 lg:h-full lg:min-h-[22rem]"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function LocationSection() {
  return (
    <Section tone="cream">
      <Reveal>
        <SectionHeading eyebrow="Location & contact" title="Visit the institute in Jayankondam" />
      </Reveal>
      <LocationBlock />
    </Section>
  );
}

export function EnquiryFormSection({ defaultClass }: { defaultClass?: string }) {
  return (
    <div id="enquiry" className="scroll-mt-24 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
      <h2 className="text-2xl font-extrabold sm:text-3xl">Admission enquiry</h2>
      <p className="mb-6 mt-2 text-muted">Takes about a minute. We will call you back on the mobile number you share.</p>
      <EnquiryForm defaultClass={defaultClass} />
    </div>
  );
}
