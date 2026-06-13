import os
import json
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY", "")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

MOCK_DATA = [
    {"nome": "Campanha Meta Awareness", "plataforma": "Meta Ads", "investimento": 15000.0, "impressoes": 450000, "cliques": 12300, "conversoes": 890, "status": "Ativa"},
    {"nome": "Campanha Meta Conversao", "plataforma": "Meta Ads", "investimento": 22000.0, "impressoes": 320000, "cliques": 9800, "conversoes": 1450, "status": "Ativa"},
    {"nome": "Campanha Meta Retargeting", "plataforma": "Meta Ads", "investimento": 8000.0, "impressoes": 150000, "cliques": 4200, "conversoes": 340, "status": "Pausada"},
]

def main():
    for campanha in MOCK_DATA:
        supabase.table("campanhas").upsert(campanha, on_conflict="nome").execute()
    print(f"Ingestao Meta Ads concluida: {len(MOCK_DATA)} campanhas upserted.")

if __name__ == "__main__":
    main()
