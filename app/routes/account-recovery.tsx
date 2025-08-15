import UsernameInput from "~/components/username-input";
import type { Route } from "../+types/root";
import Button from "~/components/button";
import { Card, InputGroup } from "react-bootstrap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hive Account Recovery" },
    { name: "description", content: "Hive Account Recovery" },
  ];
}

export default function AccountRecovery() {
  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Header>
          <Card.Title>Account Recovery</Card.Title>
          <Card.Text>Enter your username to recover your account.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <UsernameInput />
              <Button variant="outline-secondary" onClick={() => {}}>
                Search
              </Button>
            </InputGroup>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
