const fs = require("fs");

const generatedSiteMap = `
User-agent: *
Disallow: /profile/
Disallow: /order/
Disallow: /store/cart
`;

fs.writeFileSync("../public/robots.txt", generatedSiteMap, "utf8");
