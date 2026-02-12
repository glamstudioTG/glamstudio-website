import { LucideIcon } from "lucide-react";

type QuickActionVariant = "pink" | "red" | "green" | "neutral";

interface QuickActionItemProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  variant?: QuickActionVariant;
  onClick?: () => void;
}

const VARIANT_STYLES: Record<QuickActionVariant, { bg: string; icon: string }> =
  {
    pink: {
      bg: "bg-pink-100",
      icon: "text-pink-600",
    },
    red: {
      bg: "bg-red-100",
      icon: "text-[#850E35]",
    },
    green: {
      bg: "bg-emerald-100",
      icon: "text-emerald-700",
    },
    neutral: {
      bg: "bg-neutral-100",
      icon: "text-neutral-700",
    },
  };

export function QuickActionItem({
  title,
  description,
  icon: Icon,
  variant = "neutral",
  onClick,
}: QuickActionItemProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-3 w-full
        rounded-lg border border-neutral-200
        bg-white p-4 text-left
        transition
        hover:bg-neutral-50
        hover:border-neutral-300
        active:scale-[0.98] cursor-pointer
      "
    >
      <div
        className={`
          flex h-10 w-10 items-center justify-center
          rounded-md
          ${styles.bg}
        `}
      >
        <Icon className={`h-5 w-5 ${styles.icon}`} />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-800">{title}</span>

        {description && (
          <span className="text-xs text-neutral-500">{description}</span>
        )}
      </div>
    </button>
  );
}
