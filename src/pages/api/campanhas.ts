import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/db'

interface Campanha {
  id: string
  nome: string
  plataforma: string
  investimento: number
  impressoes: number
  cliques: number
  conversoes: number
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Campanha[] | { error: string }>
) {
  const { data, error } = await supabase
    .from('campanhas')
    .select('*')

  if (error) {
    const mock: Campanha[] = [
      { id: '1', nome: 'Campanha Meta Awareness', plataforma: 'Meta Ads', investimento: 15000, impressoes: 450000, cliques: 12300, conversoes: 890, status: 'Ativa' },
      { id: '2', nome: 'Campanha Meta Conversao', plataforma: 'Meta Ads', investimento: 22000, impressoes: 320000, cliques: 9800, conversoes: 1450, status: 'Ativa' },
      { id: '3', nome: 'Campanha Google Search', plataforma: 'Google Ads', investimento: 18000, impressoes: 280000, cliques: 15200, conversoes: 1100, status: 'Ativa' },
      { id: '4', nome: 'Campanha Google Display', plataforma: 'Google Ads', investimento: 12000, impressoes: 510000, cliques: 8700, conversoes: 620, status: 'Pausada' },
      { id: '5', nome: 'Campanha Meta Retargeting', plataforma: 'Meta Ads', investimento: 8000, impressoes: 150000, cliques: 4200, conversoes: 340, status: 'Encerrada' },
    ]
    return res.status(200).json(mock)
  }

  return res.status(200).json(data)
}
