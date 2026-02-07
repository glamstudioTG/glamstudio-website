import { Input } from "@/src/components/ui/shadcn-io/input/input";
import type { TransactionProofFilters } from "@/src/modules/workerPanel/types/transaction-proof.types";

type Props = {
  value: TransactionProofFilters;
  onChange: (filters: TransactionProofFilters) => void;
};

export default function TransactionProofFilters({ value, onChange }: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-3 rounded-xl bg-[#FFEAEA] p-4 shadow-sm">
      <Input
        placeholder="Buscar cliente o servicio..."
        className="w-full md:w-64 border-gray-300 text-black"
        value={value.search ?? ""}
        onChange={(e) =>
          onChange({
            ...value,
            search: e.target.value || undefined,
          })
        }
      />

      <select
        className="rounded-lg border px-3 py-2 text-sm border-gray-300 text-gray-500"
        value={value.period ?? ""}
        onChange={(e) =>
          onChange({
            ...value,
            period: e.target.value ? (e.target.value as any) : undefined,
          })
        }
      >
        <option value="">Todo</option>
        <option value="day">Hoy</option>
        <option value="week">Semana</option>
        <option value="month">Mes</option>
      </select>
    </div>
  );
}
