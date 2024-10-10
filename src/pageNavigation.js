async function navigateToMatchesPage(page, url, loaderSelector, buttonClickSelector) {
    try {
        await page.goto(url, { timeout: 6000, waitUntil: 'load' }); // Aumenta el timeout a 60 segundos
        await page.waitForSelector(loaderSelector, { state: 'hidden' });
        await page.click(buttonClickSelector);
        await page.waitForSelector(loaderSelector, { state: 'hidden' });
    } catch (error) {
        console.error("Error navigating to the matches page: ", error);
        throw error;
    }
}
export default navigateToMatchesPage
