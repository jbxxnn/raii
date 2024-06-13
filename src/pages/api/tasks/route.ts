// src/pages/api/tasks/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await db.query('SELECT * FROM projects');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error); // Log the error to the console
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
}
