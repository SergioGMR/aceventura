const fs = require('fs');
const path = require('path');

function writeDataToFile(matches) {
    const data = {
        data: matches,
        updated: Date.now()
    };

    try {
        // Ruta para guardar el archivo en la carpeta ./data
        const filePath = path.join(__dirname, '..', 'data', 'data.json');

        // Verifica si la carpeta existe, si no, la crea
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Data written successfully to ./data/data.json');
    } catch (error) {
        console.error('Error writing to file: ', error);
    }
}

module.exports = { writeDataToFile };
