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
      className={`
        relative w-full
        max-w-full md:max-w-152.5
        ${isLeft ? "self-start" : "self-end"}
      `}
    >
      <div className="relative">
        <div
          className={`
            absolute inset-0
            rounded-xl blur-[34px] opacity-80
            bg-[#850E35]/40
            pointer-events-none
            ${
              isLeft
                ? "translate-x-14 -translate-y-4"
                : "-translate-x-14 -translate-y-4"
            }
            hidden md:block
          `}
        />

        <div
          className="
            relative z-10
            flex items-start gap-6
            bg-white rounded-xl
            px-6 py-6
            min-h-27
            border border-[#850E35]
            shadow-lg
          "
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF5E4] text-[#850E35] shrink-0">
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
    </div>
  );
}
