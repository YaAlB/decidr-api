import { Request, Response } from 'express';
import { processCsvData } from '../services/uploadService';
import { parseCsv } from '../utils/csvParser';

export const uploadCsv = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const data = await parseCsv(req.file.path);
        await processCsvData(data);

        res.status(200).send('Data imported successfully');
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).send('Error processing file');
    }
};
