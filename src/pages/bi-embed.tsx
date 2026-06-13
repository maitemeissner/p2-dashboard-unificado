import React from 'react'
import PowerBiEmbed from '../components/PowerBiEmbed'

export default function BiEmbedPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Unificado - Power BI</h1>
      <PowerBiEmbed
        url="https://app.powerbi.com/reportEmbed?reportId=exemplo&groupId=exemplo"
        titulo="Relatorio de Campanhas e Operacoes"
      />
    </div>
  )
}
