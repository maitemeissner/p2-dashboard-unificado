import { Card } from 'react-bootstrap';

interface Props {
  title: string;
  value: string | number;
  variant?: string;
}

export default function KpiCard({ title, value, variant = 'light' }: Props) {
  return (
    <Card bg={variant} text={variant === 'light' ? 'dark' : 'white'} className="shadow-sm">
      <Card.Body className="text-center">
        <Card.Title className="fs-4">{value}</Card.Title>
        <Card.Subtitle className="text-muted">{title}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}