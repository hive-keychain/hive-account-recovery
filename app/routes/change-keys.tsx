import { useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import Button from "~/components/button";
import NewKeysCard from "~/components/cards/new-keys-card";
import CheckBox from "~/components/check-box";
import UsernameInput from "~/components/username-input";

export default function ChangeKeys() {
  const [copyKeysToClipboard, setCopyKeysToClipboard] = useState(false);
  const [understandKeysOutsideKeychain, setUnderstandKeysOutsideKeychain] =
    useState(false);
  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "650px" }}>
        <Card.Header>
          <Card.Title>Change Keys</Card.Title>
          <Card.Text>Enter your username to change your keys.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <InputGroup.Text>@</InputGroup.Text>
              <UsernameInput onChangeCallback={() => {}} />
              <Button variant="outline-secondary" onClick={() => {}}>
                Generate Keys
              </Button>
            </InputGroup>
          </div>
          <div className="mt-3">
            <NewKeysCard
              keys={[
                {
                  name: "Master Password",
                  masterPassword: "1234567890",
                  privateKey: undefined,
                  publicKey: undefined,
                },
                {
                  name: "Owner",
                  masterPassword: undefined,
                  privateKey: "1234567890",
                  publicKey: "1234567890",
                },
                {
                  name: "Active",
                  masterPassword: undefined,
                  privateKey: "1234567890",
                  publicKey: "1234567890",
                },
                {
                  name: "Posting",
                  masterPassword: undefined,
                  privateKey: "1234567890",
                  publicKey: "1234567890",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <CheckBox
              label="I have safely copied the keys and saved them outside of Keychain"
              checked={copyKeysToClipboard}
              onChange={(checked) => setCopyKeysToClipboard(checked)}
            />
            <CheckBox
              label="I understand that Keychain should not be considered as the primary place of storage for my keys"
              checked={understandKeysOutsideKeychain}
              onChange={(checked) => setUnderstandKeysOutsideKeychain(checked)}
            />
          </div>
          <div className="mt-1 d-flex justify-content-end">
            <Button
              variant={
                understandKeysOutsideKeychain && copyKeysToClipboard
                  ? "outline-primary"
                  : "outline-secondary"
              }
              onClick={() => {}}
              disabled={!(understandKeysOutsideKeychain && copyKeysToClipboard)}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
