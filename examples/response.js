// Example for DBigCloud
// Created by Daniel Romero Sánchez
// https://www.dbigcloud.com/cloud-computing/347-automatizacion-y-monitorizacion-con-puppeteer-analizando-respuestas.html

const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

async function reponse() {

    // Configuring browser.
    let config = {
        args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox', '--ignoreHTTPSErrors'],
          headless: false
    };
    const browser = await puppeteer.launch(config);

    const URL ='https://github.com/login'

    // Navigation to URL
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    await page.on('request', r => r.continue());
    await page.goto(URL);

    // Web Elements
    const USER_INPUT = '#login_field'
    const PASSWORD_INPUT = "#password"
    const SIGNIN_BUTTON = "#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block"
    const USERNAME = 'YOUR_USERNAME'
    const PASSWORD = 'YOUR_PASSWORD'

    // interacting with web elements
    await page.click(USER_INPUT);
    await page.keyboard.type(USERNAME);

    await page.click(PASSWORD_INPUT);
    await page.keyboard.type(PASSWORD);

    await page.click(SIGNIN_BUTTON);

    // Checking response.
    page.on('response', async response => {
        if (response.url() === 'https://github.com/manifest.jsonaaa')
            console.log(await response.json())
        else if (response.url() === 'https://github.com/dashboard/recent-activity') {
            if (response.ok()){
                
                let elements = cheerio.load(await response.text());
                const comments = elements('a.lh-condensed.link-gray-dark.text-bold.mr-1.mb-2').text().trim()
                const date = new Date(response.securityDetails()._validTo * 1000)

                console.log(response.status(), response.statusText(), comments)
                console.log("Certificate expiration date " + date)
            }
            else 
                console.log(response.status(), response.statusText() )
        }
    })

    // waiting 1 sg to load
    await page.waitFor(1000);

    
    // Closing page and browsers.
    await page.close();
	await browser.close();
}   
    
reponse()
