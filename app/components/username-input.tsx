import { Form } from "react-bootstrap";

export default function UsernameInput({
  onChangeCallback,
}: {
  onChangeCallback: Function;
}) {
  return (
    <Form.Control
      type="text"
      placeholder="Enter username"
      onChange={(e) => onChangeCallback(e.target.value)}
    />
  );
}
