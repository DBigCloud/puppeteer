// Example to find and access to DBigcloud Blog through Google.
// www.dbigcloud.com

const puppeteer = require('puppeteer');

async function dbigcloud_search() {

    // Configuring browser.
    let config = {
        args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox', '--ignoreHTTPSErrors'],
          headless: false
    };
    const browser = await puppeteer.launch(config);

    const URL ='https://www.google.es'

    // Navigation to URL
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    await page.on('request', r => r.continue());
    await page.goto(URL);

    // Web Elements
    const SEARCH_INPUT = "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input"
    const SEARCH_BUTTON = "#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input.gNO89b"
    const DBIGCLOUD_LINK ="#rso > div:nth-child(1) > div > div > div > div > div.r > a"
    const TEXT_SEARCH = "dbigcloud"

    // interacting with web elements
    await page.click(SEARCH_INPUT);
    await page.keyboard.type(TEXT_SEARCH);

    await page.click(SEARCH_BUTTON);
    // waiting 1 sg to load
    await page.waitFor(1000);

    await page.click(DBIGCLOUD_LINK)
    await page.waitFor(5000);
    
    // Closing page and browsers.
    await page.close();
	await browser.close();
}   
    
dbigcloud_search()
