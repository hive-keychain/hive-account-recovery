import { Card } from "react-bootstrap";

export interface KeyCardProps {
  name: string;
  masterPassword: string | undefined;
  privateKey: string | undefined;
  publicKey: string | undefined;
}
export default function KeyCard({
  name,
  masterPassword,
  privateKey,
  publicKey,
}: KeyCardProps) {
  return (
    <Card className="mb-1">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {masterPassword && (
          <Card.Text className="mb-1">
            <b>Master Password:</b> {masterPassword}
          </Card.Text>
        )}
        {privateKey && (
          <Card.Text className="mb-1">
            <b>Private Key:</b> {privateKey}
          </Card.Text>
        )}
        {publicKey && (
          <Card.Text className="mb-1">
            <b>Public Key:</b> {publicKey}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
