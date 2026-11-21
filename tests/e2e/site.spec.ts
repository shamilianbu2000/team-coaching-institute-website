import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/", "/about", "/classes", "/faculty", "/results", "/testimonials", "/gallery", "/contact", "/privacy-policy",
  "/classes/school-tuition-classes-8-12", "/classes/neet-coaching", "/classes/competitive-exam-preparation", "/classes/crash-course",
];

const VIEWPORTS = [
  { name: "360", width: 360, height: 740 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    // map tiles / third-party iframe noise is not ours
    if (m.type() === "error" && !/google|gstatic|googleapis|maps/i.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

test.describe("pages", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with metadata and no console errors`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page).toHaveTitle(/.+/);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain(route === "/" ? "localhost:3100" : route);
      expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBeTruthy();
      // all images have alt text and load
      const imgs = page.locator("img");
      for (let i = 0; i < (await imgs.count()); i++) {
        expect(await imgs.nth(i).getAttribute("alt")).not.toBeNull();
        expect(await imgs.nth(i).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }

  test("unknown route shows 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("sitemap.xml and robots.txt are served", async ({ request }) => {
    const sm = await request.get("/sitemap.xml");
    expect(sm.status()).toBe(200);
    const body = await sm.text();
    expect(body).toContain("/classes/neet-coaching");
    const rb = await request.get("/robots.txt");
    expect(await rb.text()).toContain("Sitemap:");
  });

  test("home has structured data without invented ratings", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    expect(data["@type"]).toContain("EducationalOrganization");
    expect(data.address.addressLocality).toBe("Jayankondam");
    expect(data.aggregateRating).toBeUndefined();
  });
});

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("header links navigate to every main page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const [label, path] of [["About", "/about"], ["Classes", "/classes"], ["Faculty", "/faculty"], ["Results", "/results"], ["Testimonials", "/testimonials"], ["Gallery", "/gallery"], ["Contact", "/contact"], ["Home", "/"]] as const) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path === "/" ? "/$" : path}$`));
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    }
  });

  test("class cards open course detail pages", async ({ page }) => {
    await page.goto("/classes");
    await page.getByRole("link", { name: "View details" }).first().click();
    await expect(page).toHaveURL(/\/classes\/school-tuition-classes-8-12$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("School Tuition");
    await expect(page.getByText("Client confirmation required").first()).toBeVisible();
  });
});

test.describe("mobile menu & quick actions", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("hamburger opens, navigates, closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Classes" }).click();
    await expect(page).toHaveURL(/\/classes$/);
    await expect(menu).toBeHidden();
  });

  test("Escape closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("bottom action bar has correct call, WhatsApp and directions links", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByRole("navigation", { name: "Quick contact" });
    await expect(bar).toBeVisible();
    expect(await bar.getByRole("link", { name: /Call/ }).getAttribute("href")).toBe("tel:+916381466472");
    const wa = await bar.getByRole("link", { name: /WhatsApp/ }).getAttribute("href");
    expect(wa).toContain("https://wa.me/916381466472?text=");
    expect(decodeURIComponent(wa!)).toContain("Hello TEAM Coaching Institute, I would like to enquire about student admissions.");
    expect(await bar.getByRole("link", { name: /directions/i }).getAttribute("href")).toContain("google.com/maps/dir/?api=1&destination=11.2115569,79.3621145");
  });
});

test.describe("links", () => {
  test("contact page phone, WhatsApp, maps and embed are correct", async ({ page }) => {
    await page.goto("/contact");
    expect(await page.locator('a[href^="tel:"]').first().getAttribute("href")).toBe("tel:+916381466472");
    expect(await page.locator('a[href^="https://wa.me/916381466472"]').count()).toBeGreaterThan(0);
    expect(await page.locator('a[href*="google.com/maps/dir"]').count()).toBeGreaterThan(0);
    expect(await page.locator("iframe").getAttribute("src")).toContain("11.2115569,79.3621145");
    expect(await page.locator("iframe").getAttribute("title")).toBeTruthy();
  });

  test("Google reviews link points to the client's Maps listing", async ({ page }) => {
    await page.goto("/testimonials");
    const href = await page.getByRole("link", { name: /Read all reviews on Google/ }).getAttribute("href");
    expect(href).toContain("google.com/maps/place/TEAM+coaching+Institute");
  });

  test("no broken internal links", async ({ page, request }) => {
    const seen = new Set<string>();
    for (const route of ["/", "/about", "/classes", "/contact"]) {
      await page.goto(route);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
      hrefs.forEach((h) => seen.add(h.split("#")[0] || "/"));
    }
    for (const path of seen) {
      const res = await request.get(path);
      expect(res.status(), `link ${path}`).toBe(200);
    }
  });

  test("social section is honest when no profiles are configured", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("No official Instagram, YouTube or Facebook page was found")).toBeVisible();
  });
});

test.describe("admission form (Formspree)", () => {
  const fill = async (page: Page, over: Record<string, string> = {}) => {
    const v = { "Parent name": "Murugan", "Student name": "Priya", "Parent mobile number": "98765 43210", "Student class": "Class 10", ...over };
    for (const [label, value] of Object.entries(v)) await page.getByLabel(label, { exact: false }).first().fill(value);
  };

  test("shows validation errors and sends nothing when empty", async ({ page }) => {
    let called = false;
    await page.route("https://formspree.io/**", (r) => { called = true; r.abort(); });
    await page.goto("/contact");
    await page.getByRole("button", { name: /Submit enquiry/ }).click();
    await expect(page.getByText("Please enter the parent's name")).toBeVisible();
    await expect(page.getByText("Please enter the student's name")).toBeVisible();
    await expect(page.getByText("Please enter a mobile number")).toBeVisible();
    await expect(page.getByText("Please enter the student's class")).toBeVisible();
    expect(called).toBe(false);
  });

  test("rejects an invalid Indian mobile number", async ({ page }) => {
    await page.goto("/contact");
    await fill(page, { "Parent mobile number": "12345" });
    await page.getByRole("button", { name: /Submit enquiry/ }).click();
    await expect(page.getByText("Enter a valid 10-digit Indian mobile number")).toBeVisible();
  });

  test("submits to Formspree, shows loading then success, blocks double submit", async ({ page }) => {
    let calls = 0;
    let body: Record<string, string> = {};
    await page.route("https://formspree.io/**", async (route) => {
      calls++;
      body = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto("/contact");
    await fill(page);
    const submit = page.getByRole("button", { name: /Submit enquiry/ });
    await submit.click();
    await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
    await expect(page.getByTestId("enquiry-success")).toBeVisible();
    expect(calls).toBe(1);
    expect(body["Parent name"]).toBe("Murugan");
    expect(body["Parent mobile"]).toBe("9876543210");
    expect(body["_gotcha"]).toBe("");
  });

  test("shows a useful error when Formspree rejects the request", async ({ page }) => {
    await page.route("https://formspree.io/**", (r) => r.fulfill({ status: 422, contentType: "application/json", body: JSON.stringify({ errors: [{ message: "Form not found" }] }) }));
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: /Submit enquiry/ }).click();
    await expect(page.getByTestId("enquiry-error")).toContainText("Form not found");
    await expect(page.getByTestId("enquiry-success")).toHaveCount(0);
  });

  test("shows an error (never fake success) on network failure", async ({ page }) => {
    await page.route("https://formspree.io/**", (r) => r.abort("failed"));
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: /Submit enquiry/ }).click();
    await expect(page.getByTestId("enquiry-error")).toContainText("Network problem");
    await expect(page.getByTestId("enquiry-success")).toHaveCount(0);
  });
});

test.describe("responsive: no horizontal overflow", () => {
  for (const vp of VIEWPORTS) {
    test(`all pages at ${vp.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of ROUTES) {
        await page.goto(route);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(over, `${route} overflows by ${over}px at ${vp.width}`).toBeLessThanOrEqual(0);
      }
    });
  }

  test("mobile touch targets in header and action bar are at least 44px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    for (const loc of [page.getByRole("button", { name: "Open menu" }), ...(await page.getByRole("navigation", { name: "Quick contact" }).getByRole("link").all())]) {
      const box = await loc.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
  });
});
