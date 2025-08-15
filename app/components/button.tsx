import { Button as BootstrapButton } from "react-bootstrap";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  className = "",
  style = {},
  variant = "outline-secondary",
  size,
  disabled = false,
  onClick,
  children = "Button",
}: ButtonProps) {
  return (
    <BootstrapButton
      className={className}
      style={style}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BootstrapButton>
  );
}
