const { writeFileSync } = require("fs");
const {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  extractAndSaveData,
} = require("../middleware/scrapMiddleware");

const puppeteer = require("puppeteer-extra");
const proxyPlugin = require("puppeteer-extra-plugin-proxy");

puppeteer.use(
  proxyPlugin({
    address: "brd.superproxy.io",
    port: 22225,
    credentials: {
      username: "brd-customer-hl_12b66b9b-zone-residential_proxy1",
      password: "b9qnopkylamc",
    },
  })
);

exports.scrap = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const robots = await fetchRobotsTxt(url);
    if (!robots) {
      console.log("No robots.txt found, proceeding without restrictions.");
    }

    const links = await scrapeWebsite(url);
    if (!links.length) {
      console.log("No endpoints found on the website.");
      return res
        .status(404)
        .json({ message: "No endpoints found on the website" });
    }

    const { allowed, disallowed } = classifyEndpoints(links, robots);

    console.log("Allowed Endpoints:");
    allowed.forEach((link) => console.log(link));

    console.log("\nDisallowed Endpoints:");
    disallowed.forEach((link) => console.log(link));

    // Send the results as a JSON response
    res.json({
      allowedEndpoints: allowed,
      disallowedEndpoints: disallowed,
    });
  } catch (error) {
    console.error("Error during scraping:", error.message);
    res.status(500).json({ error: "An error occurred during scraping" });
  }
};

async function getPageBody(url) {
  // Launch the browser
  browser = await puppeteer.launch({
    headless: true,
    args: ["--ignore-certificate-errors"],
    ignoreHTTPSErrors: true,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Get the body content
  const htmlTags = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const tags = [];
    elements.forEach(element => {
      const tag = {
        tagName: element.tagName.toLowerCase(),
        attributes: {},
        content: element.textContent,
      };
      Array.from(element.attributes).forEach(attr => {
        tag.attributes[attr.name] = attr.value;
      });
      tags.push(tag);
    });
    return tags.filter(tag => tag.content !== "" || tag.content.replace(/[\t\n\r]+/g, '').trim());
  });

  // Close the browser
  await browser.close();

  return htmlTags;
}

exports.deep_scrap = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  // let browser;
  try {
    // console.log(puppeteer)
    // browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--ignore-certificate-errors'],
    //   ignoreHTTPSErrors: true,
    // });

    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(3 * 60 * 1000);

    // await page.goto(url, {
    //   waitUntil: 'domcontentloaded',
    // });

    const body = await getPageBody(url);
    console.log(body)
    const path = require('path');
    const filePath = path.join(__dirname, 'scraped_data.json');
    writeFileSync(filePath, JSON.stringify(body, null, 2));
   //const extr = await extractAndSaveData(page);
    // if (!extr) {
    //   res.status(200).json({ message: "Data has been extracted and saved." });
    // } else {
    //   res.status(500).json({ error: "Failed to scrape the URL" });
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
