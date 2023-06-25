import { ChangeEventHandler } from "react";

export function Input({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <input
      type="text"
      className="border-b bg-transparent outline-none pb-2 w-full text-white"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
