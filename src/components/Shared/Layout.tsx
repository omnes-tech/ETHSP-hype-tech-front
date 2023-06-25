"use client";

import { Toaster } from "react-hot-toast";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Toaster position="top-center" />
      {children}
    </div>
  );
}
