import { ContactInfoItem } from "./types";

type Props = ContactInfoItem & {
  align?: "left" | "right";
};

export default function ContactInfoCard({
  icon,
  title,
  description,
  subDescription,
  align = "left",
}: Props) {
  const isLeft = align === "left";

  return (
    <div
      className={`relative w-full max-w-152.5 ${
        isLeft ? "self-start" : "self-end"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-xl blur-[34px] opacity-80 
        bg-[#C2A85D]
        ${
          isLeft
            ? "translate-x-10 -translate-y-4"
            : "-translate-x-12 -translate-y-4"
        }`}
      />

      <div
        className="relative z-10 flex items-start gap-8 bg-white rounded-xl px-6 py-6 min-h-27
        border border-[#E6D39C] shadow-md"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDE68A] text-[#C2A85D] shrink-0">
          {icon}
        </div>

        <div className="text-left">
          <h4 className="text-black font-semibold">{title}</h4>
          <p className="text-sm text-[#716D6D]">{description}</p>
          {subDescription && (
            <p className="text-sm text-[#716D6D]">{subDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}
