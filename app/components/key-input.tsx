import { Form, InputGroup } from "react-bootstrap";

export const KeyInput = ({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <InputGroup>
      {label ? <InputGroup.Text>{label}</InputGroup.Text> : null}
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};
