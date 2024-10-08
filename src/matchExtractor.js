async function extractMatchData(element, cardSelectors) {
    try {
        let titleText = await element.$eval(cardSelectors.title, el => el.textContent.trim().toLowerCase());
        titleText = titleText.replace(/\s*-\s*/, ' - ');

        const exclusionKeywords = ['matches', 'match', 'round', 'stage', 'zone'];
        const containsExclusion = exclusionKeywords.some(keyword => titleText.includes(keyword));

        const [homeTeam, awayTeam] = containsExclusion ? [null, null] : titleText.split(' - ').map(t => t.trim());

        const sportText = await element.$eval(cardSelectors.sport, el => el.textContent.toLowerCase().replace('deporte: ', '').trim());
        const competitionText = await element.$eval(cardSelectors.competition, el => el.textContent.toLowerCase().replace('competición: ', '').trim());
        const dateText = await element.$eval(cardSelectors.date, el => el.textContent.trim().toLowerCase());
        const [day, time, zone] = dateText.replace('fecha: ', '').split(/,|hora:|cet/).map(t => t.trim());

        return {
            title: titleText,
            teams: { home: homeTeam, away: awayTeam },
            sport: sportText,
            competition: competitionText,
            date: { day, time, zone: 'cet' }
        };
    } catch (error) {
        console.error("Error extracting match data: ", error);
        throw error;
    }
}

module.exports = { extractMatchData };
