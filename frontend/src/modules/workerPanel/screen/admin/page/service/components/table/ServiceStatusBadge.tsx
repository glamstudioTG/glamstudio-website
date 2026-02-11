"use client";

interface Props {
  isActive: boolean;
}

export function ServiceStatusBadge({ isActive }: Props) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-neutral-200 text-neutral-600"
      }`}
    >
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
}
