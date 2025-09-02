import { useState } from "react";
import { Form } from "react-bootstrap";

export default function UsernameInput({
  onChangeCallback,
  onEnterCallback,
  value,
}: {
  onChangeCallback: Function;
  onEnterCallback?: Function;
  value?: string;
}) {
  const [inputValue, setInputValue] = useState(value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterCallback) {
      onEnterCallback();
    }
  };

  return (
    <Form.Control
      type="text"
      placeholder="Enter username"
      onChange={(e) => {
        setInputValue(e.target.value);
        onChangeCallback(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      value={inputValue}
    />
  );
}
