const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const DOMAIN = "https://chiham.vercel.app";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby(["../public/sitemap/*.gz"]);

  const siteMapIndex = `
        ${pages
          .map((page) => {
            const path = page.replace("../public", "");

            return `
                    <sitemap>
                        <loc>${`${DOMAIN}${path}`}</loc>
                        <lastmod>${getDate}</lastmod>
                    </sitemap>`;
          })
          .join("")}
    `;

  const siteMap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${siteMapIndex}
        </sitemapindex>
    `;

  const formattedSiteMap = formatted(siteMap);

  fs.writeFileSync("../public/sitemap.xml", formattedSiteMap, "utf8");
})();
