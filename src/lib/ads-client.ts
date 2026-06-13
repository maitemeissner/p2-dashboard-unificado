interface MetaAdsCampanha {
  id: string
  nome: string
  investimento: number
  impressoes: number
  cliques: number
  conversoes: number
  dataInicio: string
  dataFim: string
}

interface GoogleAdsCampanha {
  id: string
  nome: string
  custo: number
  impressoes: number
  cliques: number
  conversoes: number
  dataInicio: string
  dataFim: string
}

export async function fetchMetaAds(accountId: string): Promise<MetaAdsCampanha[]> {
  return [
    {
      id: 'meta-001',
      nome: 'Campanha Meta Awareness',
      investimento: 15000.00,
      impressoes: 450000,
      cliques: 12300,
      conversoes: 890,
      dataInicio: '2026-01-01',
      dataFim: '2026-03-31',
    },
    {
      id: 'meta-002',
      nome: 'Campanha Meta Conversao',
      investimento: 22000.00,
      impressoes: 320000,
      cliques: 9800,
      conversoes: 1450,
      dataInicio: '2026-02-01',
      dataFim: '2026-04-30',
    },
  ]
}

export async function fetchGoogleAds(customerId: string): Promise<GoogleAdsCampanha[]> {
  return [
    {
      id: 'google-001',
      nome: 'Campanha Google Search',
      custo: 18000.00,
      impressoes: 280000,
      cliques: 15200,
      conversoes: 1100,
      dataInicio: '2026-01-15',
      dataFim: '2026-04-15',
    },
    {
      id: 'google-002',
      nome: 'Campanha Google Display',
      custo: 12000.00,
      impressoes: 510000,
      cliques: 8700,
      conversoes: 620,
      dataInicio: '2026-02-01',
      dataFim: '2026-05-31',
    },
  ]
}
