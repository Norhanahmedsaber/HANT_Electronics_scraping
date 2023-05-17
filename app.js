const puppeteer = require('puppeteer')
const axios = require('axios')
const cheerio = require('cheerio')
async function ram(search) {
    const url = `https://ram-e-shop.com/?s=${search.replace(' ', '+')}&post_type=product`;
    try {

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const prices = $("bdi");
      const names  = $(".woocommerce-loop-product__title");
      const images = $(".attachment-woocommerce_thumbnail.size-woocommerce_thumbnail");

      const output = {
        price: $(prices[1]).text(),
        name : $(names[0]).text(),
        image : $(images[0]).attr('src')
      }
      

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
      const images = $(".attachment-woocommerce_thumbnail.size-woocommerce_thumbnail");
      
      const output = {
        price: $(prices[17]).text(),
        name : $(names[16]).text(),
        image :$(images[16]).attr('src')
      }

      
      return output
    } catch (err) {
      console.error(err);
    }
}
const search = async(search) => {
    const data = {
        ram: await ram(search),
        free: await free(search),
        // uge: uge(search),
        // future: future(search)
    }
    return data
}
search("Arduino UNO").then((res) => console.log(res))