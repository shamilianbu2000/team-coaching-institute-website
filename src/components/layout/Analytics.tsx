import Script from "next/script";
import { SITE } from "@/content/site";

/** Loads GA4 only when NEXT_PUBLIC_GA_ID is set. No cookies/scripts otherwise. */
export function Analytics() {
  if (!SITE.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${SITE.gaId}');`}
      </Script>
    </>
  );
}
