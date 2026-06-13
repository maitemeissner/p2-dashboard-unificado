import React from 'react'

interface KpiCardProps {
  titulo: string
  valor: string
  variacao?: number
  cor?: string
}

export default function KpiCard({ titulo, valor, variacao, cor = 'blue' }: KpiCardProps) {
  const corMap: Record<string, string> = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    red: 'border-red-500 bg-red-50',
    yellow: 'border-yellow-500 bg-yellow-50',
  }

  return (
    <div className={`rounded-lg border-l-4 p-4 shadow-sm ${corMap[cor] || corMap.blue}`}>
      <p className="text-sm text-gray-500 uppercase tracking-wide">{titulo}</p>
      <p className="text-2xl font-bold mt-1">{valor}</p>
      {variacao !== undefined && (
        <p className={`text-sm mt-1 ${variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {variacao >= 0 ? '+' : ''}{variacao}% vs periodo anterior
        </p>
      )}
    </div>
  )
}
