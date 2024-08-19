const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-parser');
const fs = require('fs');
const path = require('path');

async function fetchRobotsTxt(url) {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await axios.get(robotsUrl);
    return robotsParser(robotsUrl, response.data);
  } catch (error) {
    console.error('Error fetching robots.txt:', error.message);
    return null;
  }
}

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = new Set();

    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('/')) {
        const fullUrl = new URL(href, url).href;
        links.add(fullUrl);
      }
    });
    return Array.from(links);
  } catch (error) {
    console.error('Error scraping website:', error.message);
    return [];
  }
}

function classifyEndpoints(links, robots) {
  const allowed = [];
  const disallowed = [];

  if(robots) {
    links.forEach((link) => {
      if (robots && robots.isAllowed(link)) {
        allowed.push(link);
      } else {
        disallowed.push(link);
      }
    });
  } else {
    links.forEach(link => {
      allowed.push(link.href)
    })
  }

  return { allowed, disallowed };
}
// async function extractAndSaveData(page) {
//   const pageContent = await page.content();
//   console.log('Full page content:\n', pageContent);
//   try {
//     const extractedData = await page.evaluate(() => {
//       const data = {};
//       data.title = document.querySelector('title')?.innerText || '';
//       data.headings = Array.from(
//         document.querySelectorAll('h1, h2, h3, h4, h5, h6')
//       ).map((heading) => heading.innerText);
//       data.links = Array.from(document.querySelectorAll('a'))
//         .map((link) => ({
//           text: link.innerText.trim(),
//           href: link.href,
//         }))
//         .filter((link) => link.text);
//       data.paragraphs = Array.from(document.querySelectorAll('p')).map(
//         (paragraph) => paragraph.innerText
//       );
//       return data;
//     });

//     const filePath = path.join(__dirname, 'scraped_data.json');
//     fs.writeFileSync(filePath, JSON.stringify(extractedData, null, 2));
//     console.log(`Data extracted and saved to ${filePath}`);
//     return 0;
//   } catch (e) {
//     console.error('Data extraction failed', e);
//     return 1;
//   }
// }

function htmlFilter(data) {
  const filteredHeadings = data.headings.filter(
    (heading) => heading.trim().length > 0
  );
  const filteredParagraphs = data.paragraphs.filter(
    (paragraph) => paragraph.trim().length > 0
  );

  const filteredLinks = data.links.filter((link) => link.text.length > 0);

  return {
    title: data.title,
    headings: filteredHeadings,
    links: filteredLinks,
    paragraphs: filteredParagraphs,
  };
}

async function extractData(page) {
  try {
    const extractedData = await page.evaluate(() => {
      const data = {};
      data.title = document.querySelector('title')?.innerText || '';
      data.headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ).map((heading) => heading.innerText);
      data.links = Array.from(document.querySelectorAll('a')).map((link) => ({
        text: link.innerText.trim(),
        href: link.href,
      }));
      data.paragraphs = Array.from(document.querySelectorAll('p')).map(
        (paragraph) => paragraph.innerText
      );
      return data;
    });

    const filteredData = htmlFilter(extractedData);
    return filteredData;
  } catch (e) {
    console.error('Data extraction failed', e);
    return 1;
  }
}

const analyzeData = async (data) => {
  try {
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'system',
              content: 'Analyze the following JSON data and provide insights.',
            },
            {
              role: 'user',
              content: `Here is the JSON data: ${JSON.stringify(data)}`,
            },
          ],
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  extractData,
  analyzeData,
};
