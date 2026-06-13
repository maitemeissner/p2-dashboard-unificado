import os
import json
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY", "")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

MOCK_DATA = [
    {"nome": "Campanha Google Search", "plataforma": "Google Ads", "investimento": 18000.0, "impressoes": 280000, "cliques": 15200, "conversoes": 1100, "status": "Ativa"},
    {"nome": "Campanha Google Display", "plataforma": "Google Ads", "investimento": 12000.0, "impressoes": 510000, "cliques": 8700, "conversoes": 620, "status": "Pausada"},
    {"nome": "Campanha Google Video", "plataforma": "Google Ads", "investimento": 9500.0, "impressoes": 190000, "cliques": 5600, "conversoes": 380, "status": "Ativa"},
]

def main():
    for campanha in MOCK_DATA:
        supabase.table("campanhas").upsert(campanha, on_conflict="nome").execute()
    print(f"Ingestao Google Ads concluida: {len(MOCK_DATA)} campanhas upserted.")

if __name__ == "__main__":
    main()
