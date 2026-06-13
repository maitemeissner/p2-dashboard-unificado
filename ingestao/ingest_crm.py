import os
import mysql.connector
from datetime import datetime, timedelta
import random

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
        CREATE TABLE IF NOT EXISTS tickets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            canal VARCHAR(50),
            csat DECIMAL(3,2),
            tma_minutos INT,
            data_abertura DATE,
            data_ingestao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    canais = ['Chat', 'Ticket', 'Voz', 'Email']
    for i in range(100):
        canal = random.choice(canais)
        csat = round(random.uniform(1, 5), 2)
        tma = random.randint(5, 180)
        data = datetime.now() - timedelta(days=random.randint(0, 89))
        cursor.execute(
            'INSERT INTO tickets (canal, csat, tma_minutos, data_abertura) VALUES (%s, %s, %s, %s)',
            (canal, csat, tma, data.strftime('%Y-%m-%d'))
        )

    conn.commit()
    cursor.close()
    conn.close()
    print("Ingestão CRM concluída: 100 tickets inseridos")

if __name__ == '__main__':
    ingest()