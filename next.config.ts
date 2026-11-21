import type { NextConfig } from "next";

// Static export for GitHub Pages: set STATIC_EXPORT=1 (and NEXT_PUBLIC_BASE_PATH=/repo-name for project pages).
// Normal builds (Vercel, Netlify, `next start`) are unaffected.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: { unoptimized: staticExport },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
