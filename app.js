const puppeteer = require("puppeteer"); 
 
const Future = async (component) => { 
  const browser = await puppeteer.launch({ headless: false }); 
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
  console.log(data); 
}; 

const uge = async (component) => { 
  const browser = await puppeteer.launch({ headless: false }); 
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
  console.log(data); 
}; 
//Future("resistor"); 
uge("ic 555");