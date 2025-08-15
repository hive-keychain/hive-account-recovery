import { Button, Card } from "react-bootstrap";
import type { KeyCardProps } from "./key-card";
import KeyCard from "./key-card";

export default function NewKeysCard({ keys }: { keys: KeyCardProps[] }) {
  return (
    <Card className="w-100" style={{ maxWidth: "650px" }}>
      <Card.Body>
        <Card.Title>New Keys</Card.Title>
        {keys.map((key, index) => (
          <KeyCard key={index} {...key} />
        ))}

        <div className="mt-3">
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={() => {}}>
              Copy Keys to Clipboard
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
