import os
import mysql.connector

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASS', ''),
    'database': os.getenv('DB_NAME', 'p2_dashboard'),
}

def ingest():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    dados_mock = [
        ('Campanha Shopping', 'Google Ads', 2500.00, 60, 3.2, 'ativa', '2026-02-10'),
        ('Display Prospecting', 'Google Ads', 1800.00, 35, 2.4, 'pausada', '2026-01-05'),
    ]

    for c in dados_mock:
        cursor.execute(
            'INSERT INTO campanhas (nome, plataforma, investimento, conversoes, roas, status, data_inicio) VALUES (%s, %s, %s, %s, %s, %s, %s)',
            c
        )

    conn.commit()
    cursor.close()
    conn.close()
    print(f"Ingestão Google Ads concluída: {len(dados_mock)} campanhas inseridas")

if __name__ == '__main__':
    ingest()