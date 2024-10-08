const { chromium } = require('playwright');

async function initializeBrowser() {
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        });
        return { browser, page };
    } catch (error) {
        console.error("Error initializing the browser: ", error);
        throw error;
    }
}

module.exports = { initializeBrowser };
