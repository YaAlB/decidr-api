import express from 'express';
import { fetchPeople } from '../controllers/peopleController';

const router = express.Router();

router.get('/', fetchPeople);

export default router;
