import os
import json
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY", "")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

MOCK_DATA = [
    {"metric": "Ticket Medio", "valor": 185.50, "variacao": 12.3},
    {"metric": "Volume de Chamados", "valor": 3420, "variacao": -5.1},
    {"metric": "Tempo Medio de Resolucao (h)", "valor": 4.2, "variacao": -8.7},
    {"metric": "SLA Cumprido (%)", "valor": 94.5, "variacao": 2.1},
    {"metric": "Taxa de Reabertura (%)", "valor": 6.8, "variacao": 0.5},
]

def main():
    for kpi in MOCK_DATA:
        supabase.table("operacoes_kpi").upsert(kpi, on_conflict="metric").execute()
    print(f"Ingestao CRM concluida: {len(MOCK_DATA)} KPIs upserted.")

if __name__ == "__main__":
    main()
