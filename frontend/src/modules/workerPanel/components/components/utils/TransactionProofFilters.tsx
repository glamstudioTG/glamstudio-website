// TransactionProofFilters.tsx
import { Input } from "@/src/components/ui/shadcn-io/input/input";
import type { TransactionProofFilters } from "../../../types/transaction-proof.types";

type Props = {
  onChange: (filters: TransactionProofFilters) => void;
};

export default function TransactionProofFilters({ onChange }: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-3 rounded-xl bg-[#FFEAEA] p-4 shadow-sm">
      <Input
        placeholder="Buscar cliente o servicio..."
        className="w-full md:w-64"
        onChange={(e) => onChange({ search: e.target.value })}
      />

      <select
        className="rounded-lg border px-3 py-2 text-sm"
        onChange={(e) => onChange({ period: e.target.value as any })}
      >
        <option value="">Todo</option>
        <option value="day">Hoy</option>
        <option value="week">Semana</option>
        <option value="month">Mes</option>
      </select>
    </div>
  );
}
