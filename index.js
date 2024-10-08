const { initializeBrowser } = require('./src/browser');
const { navigateToMatchesPage } = require('./src/pageNavigation');
const { extractMatchData } = require('./src/matchExtractor');
const { extractAceStreamLinks } = require('./src/acestreamExtractor');
const { writeDataToFile } = require('./src/dataWriter');

const main = async () => {
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

        // Escribe los datos en data.json
        writeDataToFile(matches);

        await browser.close();
    } catch (error) {
        console.error("Error in the main process: ", error);
    }
};

main();
