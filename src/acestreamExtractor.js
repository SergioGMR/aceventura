async function extractAceStreamLinks(element, cardButtonSelector, page, loaderSelector) {
    try {
        const buttons = await element.$$(cardButtonSelector);
        const aceStreamChannels = [];

        for (const button of buttons) {
            const [newPage] = await Promise.all([
                page.waitForEvent('popup'),
                button.click()
            ]);

            await newPage.waitForSelector(loaderSelector, { state: 'hidden' });

            const aceStreamLinks = await newPage.evaluate(() => {
                const scripts = Array.from(document.scripts);
                const aceStreamUrls = [];
                scripts.forEach(script => {
                    if (script.textContent) {
                        const match = script.textContent.match(/acestream:\/\/[a-zA-Z0-9]+/g);
                        if (match) {
                            aceStreamUrls.push(...match);
                        }
                    }
                });
                return aceStreamUrls;
            });

            const uniqueAceStreamLink = [...new Set(aceStreamLinks)];
            if (uniqueAceStreamLink.length === 1) {
                aceStreamChannels.push(uniqueAceStreamLink[0]);
            }

            await newPage.close();
        }

        return aceStreamChannels;
    } catch (error) {
        console.error("Error extracting AceStream links: ", error);
        throw error;
    }
}

export default extractAceStreamLinks;
