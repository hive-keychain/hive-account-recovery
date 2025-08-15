import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm border-bottom"
      style={{ minHeight: "60px" }}
    >
      <Container fluid>
        <Navbar.Brand
          className="d-flex align-items-center"
          style={{
            padding: "8px 0",
            marginRight: "20px",
          }}
        >
          <img
            src="/logohive.png"
            alt="Hive Logo"
            style={{
              height: "40px",
              width: "auto",
            }}
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Account Recovery</Nav.Link>
          <Nav.Link href="/change-keys">Change Keys</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
