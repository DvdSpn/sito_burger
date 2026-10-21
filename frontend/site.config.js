// Public address of the site, e.g. "https://www.example.it" (no trailing slash).
// For now the free Cloudflare address; replace it when the site gets its own
// domain. Set it here or via REACT_APP_SITE_URL.
module.exports = {
  siteUrl: (process.env.REACT_APP_SITE_URL || "https://sito-burger.2006spinosadavide.workers.dev").replace(/\/+$/, ""),
};
