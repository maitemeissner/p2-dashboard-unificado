import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/db'

interface CorrelacaoPonto {
  mes: string
  investimentoTotal: number
  volumeChamados: number
  ticketMedio: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CorrelacaoPonto[] | { error: string }>
) {
  const { data, error } = await supabase
    .from('correlacao')
    .select('*')
    .order('mes', { ascending: true })

  if (error) {
    const mock: CorrelacaoPonto[] = [
      { mes: '2026-01', investimentoTotal: 45000, volumeChamados: 2800, ticketMedio: 165.00 },
      { mes: '2026-02', investimentoTotal: 52000, volumeChamados: 3100, ticketMedio: 172.30 },
      { mes: '2026-03', investimentoTotal: 48000, volumeChamados: 2950, ticketMedio: 180.10 },
      { mes: '2026-04', investimentoTotal: 55000, volumeChamados: 3420, ticketMedio: 185.50 },
      { mes: '2026-05', investimentoTotal: 60000, volumeChamados: 3650, ticketMedio: 192.00 },
    ]
    return res.status(200).json(mock)
  }

  return res.status(200).json(data)
}
