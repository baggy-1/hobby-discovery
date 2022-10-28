const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const DOMAIN = "https://chiham.vercel.app/";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
    "../pages/**/*.tsx",
    "../pages/*.tsx",
    "!../pages/_app.tsx",
    "!../pages/_document.tsx",
    "!../pages/api",
    "!../pages/order/index.tsx",
    "!../pages/profile/index.tsx",
    "!../pages/profile/update.tsx",
    "!../pages/store/cart.tsx",
  ]);

  const pagesSiteMap = `
    ${pages
      .map((page) => {
        const path = page
          .replace("../pages", "")
          .replace(".tsx", "")
          .replace(/\/index/g, "");
        const routePath = path === "/index" ? "" : path;

        return `
                <url>
                    <loc>${`${DOMAIN}${routePath}`}</loc>
                    <lastmod>${getDate}</lastmod>
                </url>
            `;
      })
      .join("")}`;

  const generatedSiteMap = `
            <?xml version="1.0" encoding="UTF-8"?>
                <urlset
                    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
                    >
                    ${pagesSiteMap}
                </urlset>
            `;

  const formattedSiteMap = formatted(generatedSiteMap);

  fs.writeFileSync(
    "../public/sitemap/sitemap-common.xml",
    formattedSiteMap,
    "utf8"
  );
})();
