const puppeteer = require('puppeteer')

const anas = async (component) => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(`https://ram-e-shop.com/?s=${component.replace(" ", "+")}&product_cat=0&post_type=product`, {
        waitUntil: "domcontentloaded"
    })
    const data =await page.evaluate(()=>{
        const output = {}
        output.name = Array.from(document.querySelectorAll("h2.woocommerce-loop-product__title")).map((element) => element.textContent)[0]
        output.price=Array.from(document.querySelectorAll(".woocommerce-Price-amount.amount")).map((element)=> element.innerHTML)[0]
        return output
    })
    console.log(data)
}
anas("flex sensor");