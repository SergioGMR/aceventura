async function navigateToMatchesPage(page, url, loaderSelector, buttonClickSelector) {
    try {
        await page.goto(url);
        await page.waitForSelector(loaderSelector, { state: 'hidden' });
        await page.click(buttonClickSelector);
        await page.waitForSelector(loaderSelector, { state: 'hidden' });
    } catch (error) {
        console.error("Error navigating to the matches page: ", error);
        throw error;
    }
}

module.exports = { navigateToMatchesPage };
