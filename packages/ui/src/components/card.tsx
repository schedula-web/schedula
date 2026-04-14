import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-4 shadow-md">
      {children}
    </div>
  );
}