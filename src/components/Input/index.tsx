import { ChangeEventHandler } from "react";

export function Input({
  placeholder,
  onChange,
  type = "text",
}: {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: string;
}) {
  return (
    <input
      type={type}
      className="border-b bg-transparent outline-none pb-2 w-full text-white"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
