"use client";

import { ReactNode } from "react";

export function AdminTopbar({ children }: { children: ReactNode }) {
  return (
    <div className=" p-6">
      <div className="mx-auto max-w-7xl space-y-6">{children}</div>
    </div>
  );
}
