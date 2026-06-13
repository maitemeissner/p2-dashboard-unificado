import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/db'

interface OperacaoKpi {
  metric: string
  valor: number
  variacao: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OperacaoKpi[] | { error: string }>
) {
  const { data, error } = await supabase
    .from('operacoes_kpi')
    .select('*')

  if (error) {
    const mock: OperacaoKpi[] = [
      { metric: 'Ticket Medio', valor: 185.50, variacao: 12.3 },
      { metric: 'Volume de Chamados', valor: 3420, variacao: -5.1 },
      { metric: 'Tempo Medio de Resolucao (h)', valor: 4.2, variacao: -8.7 },
      { metric: 'SLA Cumprido (%)', valor: 94.5, variacao: 2.1 },
      { metric: 'Taxa de Reabertura (%)', valor: 6.8, variacao: 0.5 },
    ]
    return res.status(200).json(mock)
  }

  return res.status(200).json(data)
}
