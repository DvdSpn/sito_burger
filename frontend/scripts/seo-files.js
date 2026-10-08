// Writes public/robots.txt (and public/sitemap.xml once a domain is set)
// from site.config.js, so the domain lives in one place. Runs before every build.
const fs = require("fs");
const path = require("path");
const { siteUrl } = require("../site.config");

const pages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/bevande", changefreq: "monthly", priority: "0.8" },
  { loc: "/chi-siamo", changefreq: "monthly", priority: "0.7" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const publicDir = path.join(__dirname, "..", "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

// A sitemap needs absolute URLs: only write it once there is a domain.
if (siteUrl) {
  fs.writeFileSync(sitemapPath, sitemap);
} else if (fs.existsSync(sitemapPath)) {
  fs.unlinkSync(sitemapPath);
}

const robots = `# Robots file for Burger & Grill Camucia
User-agent: *
Allow: /
${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`;
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

console.log(
  siteUrl
    ? `[seo-files] sitemap.xml and robots.txt written for ${siteUrl}`
    : "[seo-files] no domain set in site.config.js: robots.txt only, no sitemap.xml"
);
