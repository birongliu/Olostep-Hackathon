import {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  extractData,
  analyzeData,
  checkUrl,
} from "../middleware/scrapMiddleware.js";

import puppeteer  from "puppeteer-extra";
import proxyPlugin from "puppeteer-extra-plugin-proxy"
import ScrapedData  from "../models/scrapModel.js";

puppeteer.use(proxyPlugin);


async function getBroswer(url) {
  await installBroswer();
  let browser = await puppeteer.launch({
    headless: true,
    args: ["--ignore-certificate-errors"],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(3 * 60 * 1000);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  return { browser, page };
}

export const scrap = async (req, res) => {
  const { url } = req.body;
  console.log(req.body);

  if (!checkUrl(url)) {
    return res.status(400).json({ status: 400, data: "URL is not found" });
  }

  if (!url) {
    return res.status(400).json({ status: 400, data: "URL is required" });
  }

  try {
    const robots = await fetchRobotsTxt(url);
    if (!robots) {
      console.log("No robots.txt found, proceeding without restrictions.");
    }

    const links = await scrapeWebsite(url);
    if (!links.length) {
      console.log("No endpoints found on the website.");
      const browser = await getBroswer(url);
      console.log(browser);
      const extractedData = await extractData(browser.page);
      return res
        .status(200)
        .json({ data: classifyEndpoints(extractedData.links), status: 200 });
    }

    const { allowed, disallowed } = classifyEndpoints(links, robots);

    res.json({
      status: 200,
      data: {
        allowedEndpoints: allowed,
        disallowedEndpoints: disallowed,
      },
    });
  } catch (error) {
    console.error("Error during scraping:", error.message);
    res
      .status(500)
      .json({ status: 500, data: "An error occurred during scraping" });
  }
};


export const deep_scrap = async (req, res) => {
  const { url } = req.body;

  if (!checkUrl(url)) {
    return res.status(400).json({ status: 400, data: "URL is not found" });
  }

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let { browser, page } = await getBroswer(url);

  try {
    const data = await extractData(page);
    const analysis = await analyzeData(data);
    console.log(analysis);
    if (data) {
      // Filter out links without a valid href
      const filteredLinks = data.links
        .map((link) => ({
          text: link.text,
          href: link.href,
        }))
        .filter((link) => link.href); // Keep only links with a valid href

      // Check if a record with the same URL already exists
      let scrapedData = await ScrapedData.findOne({ url });

      if (scrapedData) {
        // Update the existing record
        scrapedData.title = data.title;
        scrapedData.headings = data.headings;
        scrapedData.links = filteredLinks;
        scrapedData.paragraphs = data.paragraphs;
        scrapedData.analysisSummary =
          analysis.choices[0]?.message?.content || "";

        await scrapedData.save(); // Save the updated record
        console.log("Updated existing record for URL:", url);
      } else {
        // Create a new instance of the ScrapedData model
        console.log(analysis);
        const analysisData = analysis.choices[0];
        scrapedData = new ScrapedData({
          title: data.title,
          url: url,
          headings: data.headings,
          links: filteredLinks,
          paragraphs: data.paragraphs,
          analysisSummary: analysisData ? analysisData.message.content : "",
        });

        await scrapedData.save(); // Save the new record
        console.log("Saved new record for URL:", url);
      }

      return res.status(200).json({
        status: 200,
        data: {
          context: data,
          analysis,
        },
      });
    } else {
      res.status(500).json({ error: "Failed to scrape the URL" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
