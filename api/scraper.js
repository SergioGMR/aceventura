import initializeBrowser from '../src/browser.js';
import navigateToMatchesPage from '../src/pageNavigation.js';
import extractMatchData from '../src/matchExtractor.js';
import extractAceStreamLinks from '../src/acestreamExtractor.js';
import writeDataToFile from '../src/dataWriter.js';

export default async function handler(req, res) {
    const url = 'https://duckhub.net';
    const loaderSelector = '#loader';
    const buttonClickSelector = 'body > div.menu > div > label:nth-child(3)';
    const cardSelectors = {
        card: 'div.par_dark-partidos',
        title: 'h3.evento-titulo',
        sport: 'p:nth-child(2)',
        competition: 'p:nth-child(3)',
        date: 'p:nth-child(4)',
        button: 'button.par_button'
    };

    try {
        const { browser, page } = await initializeBrowser();
        await navigateToMatchesPage(page, url, loaderSelector, buttonClickSelector);
        const matches = [];
        const elements = await page.$$(cardSelectors.card);
        for (const element of elements) {
            const match = await extractMatchData(element, cardSelectors);
            const channels = await extractAceStreamLinks(element, cardSelectors.button, page);
            match.channels = channels;
            matches.push(match);
        }
        writeDataToFile(matches);
        await browser.close();
        res.status(200).send("Scraping done!");
    } catch (error) {
        res.status(500).send("Error occurred: " + error.message);
    }
}
