import { LinkButton, Section } from "@/components/ui/ui";

export default function NotFound() {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="font-heading text-7xl font-extrabold text-sun">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-lg text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" variant="navy">Go to home</LinkButton>
          <LinkButton href="/contact" variant="outline">Contact us</LinkButton>
        </div>
      </div>
    </Section>
  );
}
