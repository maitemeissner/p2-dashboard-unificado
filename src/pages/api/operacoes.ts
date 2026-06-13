import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rows = await query(
      'SELECT canal, COUNT(*) as total, AVG(csat) as avg_csat, AVG(tma_minutos) as avg_tma FROM tickets GROUP BY canal'
    );
    res.status(200).json({ operacoes: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch operacoes' });
  }
}