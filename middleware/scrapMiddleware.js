import axios  from 'axios';
import * as cheerio from 'cheerio';
import robotsParser from 'robots-parser';

const checkUrl = async (url) => {
  try {
    new URL(url);

    const response = await fetch(url, { method: 'HEAD' });

    if (response.ok) {
      console.log(`The URL ${url} is valid and exists.`);
      return true;
    } else {
      console.log(
        `The URL ${url} exists but returned a status of ${response.status}.`
      );
      return false;
    }
  } catch (error) {
    console.error(`Invalid or non-existent URL: ${url}`, error.message);
    return false;
  }
};

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

export {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  extractData,
  analyzeData,
  checkUrl,
};
