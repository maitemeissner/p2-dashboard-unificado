import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import KpiCard from '@/components/KpiCard';
import TabelaCampanhas from '@/components/TabelaCampanhas';
import PowerBiEmbed from '@/components/PowerBiEmbed';

interface Correlacao {
  total_campanhas: number;
  total_tickets: number;
  csat_medio: number;
}

export default function Home() {
  const [correlacao, setCorrelacao] = useState<Correlacao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/correlacao')
      .then(r => r.json())
      .then(d => { setCorrelacao(d.correlacao); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Dashboard Unificado: Campanhas + Operações</h1>

      <Row className="mb-4">
        <Col md={4}>
          <KpiCard
            title="Campanhas Ativas"
            value={correlacao?.total_campanhas ?? '-'}
            variant="primary"
          />
        </Col>
        <Col md={4}>
          <KpiCard
            title="Total de Tickets"
            value={correlacao?.total_tickets ?? '-'}
            variant="info"
          />
        </Col>
        <Col md={4}>
          <KpiCard
            title="CSAT Médio"
            value={correlacao?.csat_medio?.toFixed(2) ?? '-'}
            variant="success"
          />
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="campanhas">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item><Nav.Link eventKey="campanhas">Campanhas</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="bi">Power BI</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="campanhas">
            <TabelaCampanhas />
          </Tab.Pane>
          <Tab.Pane eventKey="bi">
            <PowerBiEmbed />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}