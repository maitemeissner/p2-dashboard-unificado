import React, { useEffect, useState } from 'react'
import KpiCard from '../components/KpiCard'
import TabelaCampanhas from '../components/TabelaCampanhas'

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

interface OperacaoKpi {
  metric: string
  valor: number
  variacao: number
}

export default function Home() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [operacoes, setOperacoes] = useState<OperacaoKpi[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [campRes, opRes] = await Promise.all([
          fetch('/api/campanhas'),
          fetch('/api/operacoes'),
        ])
        const campData: Campanha[] = await campRes.json()
        const opData: OperacaoKpi[] = await opRes.json()
        setCampanhas(campData)
        setOperacoes(opData)
      } catch {
        console.error('Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando dashboard...</p>
      </div>
    )
  }

  const investimentoTotal = campanhas.reduce((s, c) => s + c.investimento, 0)
  const conversoesTotal = campanhas.reduce((s, c) => s + c.conversoes, 0)
  const ticketMedio = operacoes.find(o => o.metric === 'Ticket Medio')
  const volumeChamados = operacoes.find(o => o.metric === 'Volume de Chamados')

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Unificado Campanhas + Operacoes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KpiCard
          titulo="Investimento Total"
          valor={`R$ ${investimentoTotal.toLocaleString('pt-BR')}`}
          variacao={8.5}
          cor="blue"
        />
        <KpiCard
          titulo="Conversoes"
          valor={conversoesTotal.toLocaleString('pt-BR')}
          variacao={12.3}
          cor="green"
        />
        <KpiCard
          titulo={ticketMedio?.metric || 'Ticket Medio'}
          valor={`R$ ${(ticketMedio?.valor ?? 0).toFixed(2)}`}
          variacao={ticketMedio?.variacao}
          cor="yellow"
        />
        <KpiCard
          titulo={volumeChamados?.metric || 'Volume de Chamados'}
          valor={(volumeChamados?.valor ?? 0).toLocaleString('pt-BR')}
          variacao={volumeChamados?.variacao}
          cor="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Campanhas</h2>
        <TabelaCampanhas campanhas={campanhas} />
      </div>

      <div className="text-center">
        <a
          href="/bi-embed"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Abrir Dashboard Power BI
        </a>
      </div>
    </div>
  )
}
