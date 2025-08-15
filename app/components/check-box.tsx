import { Form } from "react-bootstrap";

export default function CheckBox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="form-check">
      <Form.Check
        id={label}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        label={label}
      />
    </div>
  );
}
