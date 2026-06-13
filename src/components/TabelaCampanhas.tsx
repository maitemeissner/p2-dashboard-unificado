import React, { useState, useMemo } from 'react'

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

interface TabelaCampanhasProps {
  campanhas: Campanha[]
}

type SortKey = keyof Campanha

export default function TabelaCampanhas({ campanhas }: TabelaCampanhasProps) {
  const [sortKey, setSortKey] = useState<SortKey>('nome')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [filtro, setFiltro] = useState('')

  const sorted = useMemo(() => {
    const filtered = campanhas.filter(c =>
      c.nome.toLowerCase().includes(filtro.toLowerCase())
    )
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
  }, [campanhas, sortKey, sortDir, filtro])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar campanhas..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="mb-4 w-full rounded border p-2 text-sm"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['nome', 'plataforma', 'investimento', 'impressoes', 'cliques', 'conversoes', 'status'].map(k => (
                <th
                  key={k}
                  onClick={() => handleSort(k as SortKey)}
                  className="px-4 py-2 text-left font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700"
                >
                  {k === 'nome' ? 'Nome' :
                   k === 'plataforma' ? 'Plataforma' :
                   k === 'investimento' ? 'Investimento' :
                   k === 'impressoes' ? 'Impressoes' :
                   k === 'cliques' ? 'Cliques' :
                   k === 'conversoes' ? 'Conversoes' :
                   'Status'}
                  {sortKey === k && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sorted.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.nome}</td>
                <td className="px-4 py-2">{c.plataforma}</td>
                <td className="px-4 py-2">R$ {c.investimento.toLocaleString('pt-BR')}</td>
                <td className="px-4 py-2">{c.impressoes.toLocaleString('pt-BR')}</td>
                <td className="px-4 py-2">{c.cliques.toLocaleString('pt-BR')}</td>
                <td className="px-4 py-2">{c.conversoes.toLocaleString('pt-BR')}</td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    c.status === 'Ativa' ? 'bg-green-100 text-green-800' :
                    c.status === 'Pausada' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
