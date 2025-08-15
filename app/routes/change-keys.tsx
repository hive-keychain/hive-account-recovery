import { Card, InputGroup } from "react-bootstrap";
import Button from "~/components/button";
import UsernameInput from "~/components/username-input";

export default function ChangeKeys() {
  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Header>
          <Card.Title>Change Keys</Card.Title>
          <Card.Text>Enter your username to change your keys.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className="row justify-content-center">
            <InputGroup className="w-100" style={{ maxWidth: "500px" }}>
              <UsernameInput />
              <Button variant="outline-secondary" onClick={() => {}}>
                Change Keys
              </Button>
            </InputGroup>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
