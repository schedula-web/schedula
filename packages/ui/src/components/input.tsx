import React from "react";

export function Input({
  name,
  placeholder,
  onChange,
}: {
  name: string;
  placeholder?: string;
  onChange?: (e: any) => void;
}) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border p-2 rounded w-full"
    />
  );
}