export default function Select({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-[#716D6D] mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C2A85D]">
            {icon}
          </span>
        )}
        <select
          className={`w-full rounded-lg border text-black bg-[#F0DDC1] border-[#FDE68A] p-3.5 
            focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
            ${icon ? "pl-10" : ""}
            placeholder:text-[10px]
          `}
        >
          <option value="">Selecciona un servicio</option>
          <option value="volumen">Volumen egipcio</option>
          <option value="clasico">Clásico</option>
        </select>
      </div>
    </div>
  );
}
