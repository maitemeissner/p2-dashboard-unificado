import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rows = await query(
      'SELECT * FROM campanhas ORDER BY data_inicio DESC LIMIT 50'
    );
    res.status(200).json({ campanhas: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campanhas' });
  }
}