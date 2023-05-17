const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page we want to scrape
const url = "https://ram-e-shop.com/?s=flex+sensor&post_type=product";

// Async function which scrapes the data
async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $(".attachment-woocommerce_thumbnail.size-woocommerce_thumbnail");
    const countries = []
    listItems.each((idx, el) => {
      const country = { name: "", iso3: "" };
      country.name = $(el).attr('src')
      countries.push(country);
    });
    console.log(countries);
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();