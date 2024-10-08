import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled: boolean;
}
function Button({ type, children, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="bg-blue-500 disabled:bg-gray-500 py-2 rounded text-white font-semibold hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

export default Button;
