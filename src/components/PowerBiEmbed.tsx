import { Card } from 'react-bootstrap';

export default function PowerBiEmbed() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Power BI — Análise Avançada</Card.Title>
        <Card.Text className="text-muted">
          Após publicar seu dashboard no Power BI Service, cole o iframe abaixo.
        </Card.Text>
        <div className="ratio ratio-16x9">
          <iframe
            src={process.env.NEXT_PUBLIC_POWERBI_URL || ''}
            title="Power BI Dashboard"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}