import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Button({
  children,
  width,
  height,
  className = "",
  type = "button",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button ${className}`.trim()}
      style={{ width, height, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
