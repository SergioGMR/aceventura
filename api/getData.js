import { promises as fs } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
    try {
        // Ubicación del archivo data.json (ajustar si es necesario)
        const filePath = join(process.cwd(), 'data', 'data.json');

        // Leer el contenido del archivo
        const data = await fs.readFile(filePath, 'utf8');

        // Enviar el contenido del archivo como respuesta JSON
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.error("Error leyendo el archivo data.json:", error);
        res.status(500).json({ error: 'No se pudo leer el archivo de datos' });
    }
}
