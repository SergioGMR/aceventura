const { firefox } = require('playwright');

async function initializeBrowser() {
    try {
        const browser = await firefox.launch({ headless: true, ignoreHTTPSErrors: true, args: ['--no-sandbox'] });
        const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        })
        const page = await context.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9'
        });
        return { browser, page };
    } catch (error) {
        console.error("Error initializing the browser: ", error);
        throw error;
    }
}

module.exports = { initializeBrowser };
