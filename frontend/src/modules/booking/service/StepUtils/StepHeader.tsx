import { Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

type StepHeaderProps = {
  title: string;
  step?: number;
  icon: LucideIcon;
};

export default function StepHeader({
  title,
  step,
  icon: Icon,
}: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row gap-3">
        <Icon size={30} className="text-[#850E35]" />
        <h2 className="text-black text-4xl font-mono">{title}</h2>
      </div>
      <span className="text-sm text-black/60">Paso {step} de 5</span>
    </div>
  );
}
