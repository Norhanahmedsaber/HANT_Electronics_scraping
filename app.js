const puppeteer = require("puppeteer"); 
const axios = require('axios')
const cheerio = require('cheerio')


const future = async (component) => { 
  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage(); 
  await page.goto( 
    `https://store.fut-electronics.com/search?type=product&q=${component.replace( 
      " ", 
      "-" 
    )}` 
  ); 
  const data = await page.evaluate(() => { 
    const output = {}; 
    output.name = Array.from(document.querySelectorAll("h3")).map( 
      (element) => element.textContent 
    )[1]; 
    output.price = Array.from(document.querySelectorAll("h4")).map( 
      (element) => element.innerHTML 
    )[0]; 
    output.img = Array.from(document.querySelectorAll("img")).map((element) => 
      element.getAttribute("src") 
    )[1]; 
    return output; 
  });
  browser.close()
  data.store = "future"
  return data;
}; 

const uge = async (component) => { 
  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage(); 
  await page.goto( 
    `https://uge-one.com/index.php?route=product/search&search=${component.replace( 
      " ", 
      "%20" 
    )}` 
  ); 
  const data = await page.evaluate(() => { 
    const output = {}; 
    output.name = Array.from(document.querySelectorAll(".name a")).map((element) => 
      element.innerHTML
    )[36];
    output.price = Array.from(document.querySelectorAll(".price-normal")).map( 
      (element) => element.innerHTML 
    )[20]; 
    output.img = Array.from(document.querySelectorAll(".product-img")).map((element) => 
      element.getAttribute("href") 
    )[36]; 
    return output; 
  });
  browser.close()
  data.store = "uge"

  return data
}; 
async function ram(search) {
    const url = `https://ram-e-shop.com/?s=${search.replace(' ', '+')}&post_type=product`;
    try {

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const prices = $("bdi");
      const names  = $(".woocommerce-loop-product__title");
      const img = $(".attachment-woocommerce_thumbnail.size-woocommerce_thumbnail");

      const output = {
        price: $(prices[1]).text(),
        name : $(names[0]).text(),
        img : $(img[0]).attr('src')
      }
      
  output.store = "ram"

      return output
    } catch (err) {
      console.error(err);
    }
}
async function free(search) {
    const url = `https://free-electronic.com/?s=${search.replace(' ', '+')}&product_cat=0&post_type=product`;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const prices = $(".woocommerce-Price-amount.amount");
      const names = $(".woocommerce-loop-product__title");
      const img = $(".attachment-woocommerce_thumbnail.size-woocommerce_thumbnail");
      
      const output = {
        price: $(prices[17]).text(),
        name : $(names[16]).text(),
        img :$(img[16]).attr('src')
      }
  output.store = "free"

      return output
    } catch (err) {
      console.error(err);
    }
}
const search = async(search) => {
    let data = []
    const _ram=await ram(search)
    const _free=await free(search)
    const _future=await future(search)
    const _uge=await uge(search)

    _ram && (data = data.concat(_ram))
    _free && (data = data.concat(_free))
    _future && (data = data.concat(_future))
    _uge && (data = data.concat(_uge))


    return data
}

module.exports={
  search
}