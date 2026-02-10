import { ShieldX } from "lucide-react";

export function AdminForbiddenState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <ShieldX className="h-10 w-10 text-rose-500" />

      <h2 className="text-lg font-semibold text-neutral-800">
        Acceso restringido
      </h2>

      <p className="max-w-sm text-sm text-neutral-600">
        Lo sentimos, este contenido está disponible únicamente para
        administradores del sistema.
      </p>
    </div>
  );
}
