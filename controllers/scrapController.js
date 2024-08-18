const {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  extractAndSaveData,
  analyzeData,
} = require('../middleware/scrapMiddleware');

const puppeteer = require('puppeteer-extra');
const proxyPlugin = require('puppeteer-extra-plugin-proxy');
const ScrapedData = require('../models/scrapModel');

exports.scrap = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const robots = await fetchRobotsTxt(url);
    if (!robots) {
      console.log('No robots.txt found, proceeding without restrictions.');
    }

    const links = await scrapeWebsite(url);
    if (!links.length) {
      console.log('No endpoints found on the website.');
      return res
        .status(404)
        .json({ message: 'No endpoints found on the website' });
    }

    const { allowed, disallowed } = classifyEndpoints(links, robots);

    // console.log('Allowed Endpoints:');
    // allowed.forEach((link) => console.log(link));

    // console.log('\nDisallowed Endpoints:');
    // disallowed.forEach((link) => console.log(link));

    res.json({
      allowedEndpoints: allowed,
      disallowedEndpoints: disallowed,
    });
  } catch (error) {
    console.error('Error during scraping:', error.message);
    res.status(500).json({ error: 'An error occurred during scraping' });
  }
};

// exports.deep_scrap = async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: 'URL is required' });
//   }
//   let browser;
//   try {
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ['--ignore-certificate-errors'],
//       ignoreHTTPSErrors: true,
//     });

//     const page = await browser.newPage();
//     page.setDefaultNavigationTimeout(3 * 60 * 1000);

//     await page.goto(url, {
//       waitUntil: 'domcontentloaded',
//     });

//     const data = await extractAndSaveData(page);
//     const analysis = await analyzeData(data);
//     if (data) {
//       res.json({
//         data,
//         analysis,
//       });
//       // res.status(200).json({ message: 'Data has been extracted and saved.' });
//     } else {
//       res.status(500).json({ error: 'Failed to scrape the URL' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log(error);
//   }
// };

exports.deep_scrap = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--ignore-certificate-errors'],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(3 * 60 * 1000);

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    const data = await extractAndSaveData(page);
    const analysis = await analyzeData(data);

    if (data) {
      const filteredLinks = data.links
        .map(link => ({
          text: link.text,
          href: link.href,
        }))
        .filter(link => link.href);

      let scrapedData = await ScrapedData.findOne({ url });

      if (scrapedData) {
        scrapedData.title = data.title;
        scrapedData.headings = data.headings;
        scrapedData.links = filteredLinks;
        scrapedData.paragraphs = data.paragraphs;
        scrapedData.analysisSummary = analysis.choices[0]?.message?.content || '';

        await scrapedData.save();
        console.log('Updated existing record for URL:', url);
      } else {
        scrapedData = new ScrapedData({
          title: data.title,
          url: url,
          headings: data.headings,
          links: filteredLinks,
          paragraphs: data.paragraphs,
          analysisSummary: analysis.choices[0]?.message?.content || '',
        });

        await scrapedData.save(); 
        console.log('Saved new record for URL:', url);
      }

      res.json({
        data,
        analysis,
      });
    } else {
      res.status(500).json({ error: 'Failed to scrape the URL' });
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
