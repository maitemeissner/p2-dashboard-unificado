import os
import mysql.connector
from datetime import datetime

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASS', ''),
    'database': os.getenv('DB_NAME', 'p2_dashboard'),
}

def ingest():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS campanhas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255),
            plataforma VARCHAR(50),
            investimento DECIMAL(10,2),
            conversoes INT,
            roas DECIMAL(5,2),
            status VARCHAR(20),
            data_inicio DATE,
            data_ingestao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    dados_mock = [
        ('Campanha Meta Q1', 'Meta Ads', 5000.00, 120, 3.5, 'ativa', '2026-01-15'),
        ('Retargeting Meta', 'Meta Ads', 3000.00, 85, 4.2, 'ativa', '2026-02-01'),
        ('Campanha Google Q1', 'Google Ads', 4000.00, 95, 2.8, 'ativa', '2026-01-20'),
    ]

    for c in dados_mock:
        cursor.execute(
            'INSERT INTO campanhas (nome, plataforma, investimento, conversoes, roas, status, data_inicio) VALUES (%s, %s, %s, %s, %s, %s, %s)',
            c
        )

    conn.commit()
    cursor.close()
    conn.close()
    print(f"Ingestão Meta Ads concluída: {len(dados_mock)} campanhas inseridas")

if __name__ == '__main__':
    ingest()