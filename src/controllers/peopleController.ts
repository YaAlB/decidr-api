import { Request, Response } from 'express';
import { getPeople } from '../services/peopleService';

export const fetchPeople = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '', sortBy = 'first_name', order = 'asc' } = req.query;

  try {
    const { total, people } = await getPeople(+page, +limit, search as string, sortBy as string, order as string);
    res.status(200).json({ total, people });
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
};
