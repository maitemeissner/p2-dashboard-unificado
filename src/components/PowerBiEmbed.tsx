import React from 'react'

interface PowerBiEmbedProps {
  url: string
  titulo?: string
}

export default function PowerBiEmbed({ url, titulo }: PowerBiEmbedProps) {
  return (
    <div className="w-full">
      {titulo && (
        <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
      )}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full rounded border"
          allowFullScreen
          title={titulo || 'Power BI Dashboard'}
        />
      </div>
    </div>
  )
}
