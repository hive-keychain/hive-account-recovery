import { Button, Card } from "react-bootstrap";
import type { KeyCardProps } from "./key-card";
import KeyCard from "./key-card";

export default function NewKeysCard({
  username,
  keys,
  copyKeysToClipboardClickedCallback,
}: {
  username: string;
  keys: KeyCardProps[];
  copyKeysToClipboardClickedCallback: () => void;
}) {
  const copyKeysToClipboard = () => {
    const keysString = JSON.stringify({ username, keys }, null, 2);
    navigator.clipboard.writeText(keysString);
    copyKeysToClipboardClickedCallback();
  };
  return (
    <Card className="w-100" style={{ maxWidth: "700px" }}>
      <Card.Body>
        <Card.Title>New Keys</Card.Title>
        {keys.map((key, index) => (
          <KeyCard key={index} {...key} />
        ))}

        <div className="mt-3">
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={copyKeysToClipboard}>
              Copy Keys to Clipboard
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
