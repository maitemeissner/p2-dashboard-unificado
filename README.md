# P2 — Dashboard Unificado: Campanhas + Operações

Dashboard integrando dados de marketing (Meta Ads, Google Ads) com dados operacionais (tickets, CSAT).

## Stack
- **Frontend/Backend:** Next.js (React + TypeScript)
- **Banco:** PlanetScale (MySQL)
- **BI:** Power BI Embed
- **Cron:** GitHub Actions
- **Deploy:** Vercel

## Estrutura
```
├── src/
│   ├── pages/              # Rotas e API
│   ├── lib/db.ts           # Conexão MySQL
│   └── components/         # Componentes React
├── ingestao/               # Scripts Python de ingestão
├── .github/workflows/      # Cron semanal
└── powerbi/                # Arquivo .pbix
```