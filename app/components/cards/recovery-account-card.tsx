import { Card } from "react-bootstrap";

export default function RecoveryAccountCard({
  recoveryAccount,
}: {
  recoveryAccount: string;
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Recovery Account</Card.Title>
        <Card.Text>{recoveryAccount}</Card.Text>
      </Card.Body>
    </Card>
  );
}
