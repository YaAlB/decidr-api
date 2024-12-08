import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { parseCsv } from '../utils/csvParser';
import { processCsvData } from '../services/uploadService';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const fileName = req.headers['x-filename'] as string;
    if (!fileName) {
        res.status(400).json({ error: 'No file name provided in headers' });
        return;
    }

    const filePath = path.join(uploadDir, fileName);
    const fileStream = fs.createWriteStream(filePath);

    req.pipe(fileStream);

    fileStream.on('finish', async () => {

        // Parse and process the CSV file
        try {
            const data = await parseCsv(filePath);
            await processCsvData(data);
            res.status(200).json({ message: 'File uploaded and processed successfully' });
        } catch (err) {
            console.error('Error processing CSV file:', err);
            res.status(500).json({ error: 'Error processing CSV file' });
        }
    });

    fileStream.on('error', (err) => {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'File upload failed' });
    });
});

export default router;
