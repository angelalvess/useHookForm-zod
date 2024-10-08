import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...rest }, ref) => {
    return (
      <input {...rest} ref={ref} type={type} className="px-4 py-2 rounded" />
    );
  }
);

export default Input;
