import React, { FormEventHandler, ReactNode } from "react";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

function Form({ onSubmit, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export default Form;
