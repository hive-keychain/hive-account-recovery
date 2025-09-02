import { Form, InputGroup } from "react-bootstrap";

export const KeyInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <InputGroup>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};
