import { Spinner as BootstrapSpinner } from "react-bootstrap";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
}
