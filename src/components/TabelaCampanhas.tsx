import { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';

interface Campanha {
  id: number;
  nome: string;
  plataforma: string;
  investimento: number;
  conversoes: number;
  roas: number;
  status: string;
}

export default function TabelaCampanhas() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campanhas')
      .then(r => r.json())
      .then(d => { setCampanhas(d.campanhas || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (campanhas.length === 0) {
    return <p className="text-muted">Nenhuma campanha encontrada. Execute a ingestão de dados.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Plataforma</th>
          <th>Investimento</th>
          <th>Conversões</th>
          <th>ROAS</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {campanhas.map(c => (
          <tr key={c.id}>
            <td>{c.nome}</td>
            <td>{c.plataforma}</td>
            <td>R$ {c.investimento?.toFixed(2)}</td>
            <td>{c.conversoes}</td>
            <td>{c.roas?.toFixed(2)}x</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}