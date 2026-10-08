// Public address of the site, e.g. "https://www.example.it" (no trailing slash).
// Empty until the site has its own domain: canonical / Open Graph / schema.org
// links in public/index.html then fall back to relative paths and no
// sitemap.xml is generated. Set it here or via REACT_APP_SITE_URL.
module.exports = {
  siteUrl: (process.env.REACT_APP_SITE_URL || "").replace(/\/+$/, ""),
};
