import { Button, Card } from "react-bootstrap";
import type { KeyCardProps } from "./key-card";
import KeyCard from "./key-card";
import { useState } from "react";

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
    const keysString = generateKeysTextVersion(username, keys);
    navigator.clipboard.writeText(keysString);
    copyKeysToClipboardClickedCallback();
  };

  const generateKeysTextVersion = (username: string, keys: KeyCardProps[]) => {
    return `
Account name: @${username}
Master password:
${keys.find((key) => key.name === "Master Password")?.masterPassword}
-----------------------------------------
Owner key:
Private
${keys.find((key) => key.name === "Owner")?.privateKey}
Public
${keys.find((key) => key.name === "Owner")?.publicKey}
-----------------------------------------
Active key:
Private
${keys.find((key) => key.name === "Active")?.privateKey}
Public
${keys.find((key) => key.name === "Active")?.publicKey}
-----------------------------------------
Posting key:
Private
${keys.find((key) => key.name === "Posting")?.privateKey}
Public
${keys.find((key) => key.name === "Posting")?.publicKey}
-----------------------------------------
Memo key:
Private
${keys.find((key) => key.name === "Memo")?.privateKey}
Public
${keys.find((key) => key.name === "Memo")?.publicKey}`.trim();
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
            <Button
              variant="outline-secondary"
              onClick={() => {
                copyKeysToClipboard();
              }}
            >
              Copy Keys to Clipboard
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
