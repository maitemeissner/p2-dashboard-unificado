import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const campanhas: any = await query('SELECT COUNT(*) as total FROM campanhas');
    const tickets: any = await query('SELECT COUNT(*) as total, AVG(csat) as csat FROM tickets');
    res.status(200).json({
      correlacao: {
        total_campanhas: (campanhas as any[])[0]?.total || 0,
        total_tickets: (tickets as any[])[0]?.total || 0,
        csat_medio: (tickets as any[])[0]?.csat || 0,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch correlation' });
  }
}