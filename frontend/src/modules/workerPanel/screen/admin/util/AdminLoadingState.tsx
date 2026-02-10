import { ShieldCheck } from "lucide-react";

export function AdminLoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <ShieldCheck className="h-10 w-10 text-neutral-400 animate-pulse" />

      <h2 className="text-lg font-medium text-neutral-700">
        Cargando panel de administración
      </h2>

      <p className="max-w-sm text-sm text-neutral-500">
        Estamos validando tu sesión y preparando la información del
        administrador.
      </p>
    </div>
  );
}
