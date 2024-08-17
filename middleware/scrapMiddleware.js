const axios = require('axios');
const cheerio = require('cheerio');
const robotsParser = require('robots-parser');

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

  links.forEach((link) => {
    if (robots && robots.isAllowed(link)) {
      allowed.push(link);
    } else {
      disallowed.push(link);
    }
  });

  return { allowed, disallowed };
}

async function scrapeEndpoint(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const h1 = $('h1')
      .map((i, el) => $(el).text())
      .get();
    const links = $('a')
      .map((i, el) => ({
        href: $(el).attr('href'),
        text: $(el).text(),
      }))
      .get();
    const paragraphs = $('p')
      .map((i, el) => $(el).text())
      .get();
    const images = $('img')
      .map((i, el) => ({
        src: $(el).attr('src'),
        alt: $(el).attr('alt'),
      }))
      .get();
    const forms = $('form')
      .map((i, el) => ({
        action: $(el).attr('action'),
        method: $(el).attr('method'),
      }))
      .get();

    return {
      title,
      description,
      h1,
      links,
      paragraphs,
      images,
      forms,
    };
  } catch (error) {
    console.error('Error scraping the endpoint:', error.message);
    return null;
  }
}

module.exports = {
  fetchRobotsTxt,
  scrapeWebsite,
  classifyEndpoints,
  scrapeEndpoint,
};
