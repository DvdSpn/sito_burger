// Public address of the site. Used for canonical / Open Graph / schema.org
// links in public/index.html and for sitemap.xml and robots.txt.
// Change it here (or set REACT_APP_SITE_URL) when the domain changes.
module.exports = {
  siteUrl: (process.env.REACT_APP_SITE_URL || "https://www.burgergrillcamucia.it").replace(/\/+$/, ""),
};
