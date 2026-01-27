import { CardServiceProps } from "./types";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const frameOffsetMap = {
  "top-left": "-translate-x-3 -translate-y-3",
  "top-right": "translate-x-3 -translate-y-3",
  "bottom-left": "-translate-x-3 translate-y-3",
  "bottom-right": "translate-x-3 translate-y-3",
  "top-center": "-translate-y-3",
  "bottom-center": "translate-y-3",
};

export default function CardService({
  title,
  price,
  description,
  image,
  framePosition,
  href,
}: CardServiceProps) {
  const CardContent = (
    <div className="group flex flex-col items-center text-center gap-3 cursor-pointer">
      <h3 className="text-xl text-black font-sans">{title}</h3>

      <span className="text-sm text-gray-600">{price}</span>

      <div className="w-50 h-px bg-[#850e35] my-1" />

      <p className="text-sm text-gray-700 max-w-xs">{description}</p>

      <div className="relative w-59.25 h-86.25 mt-4">
        <div
          className={clsx(
            "absolute inset-0 rounded-md border-2 border-[#850e35]",
            "transition-all duration-500 ease-out",
            frameOffsetMap[framePosition as keyof typeof frameOffsetMap],
            "group-hover:translate-x-0 group-hover:translate-y-0",
            "group-hover:shadow-[0_25px_25px_rgba(238,105,131,0.4)]",
          )}
        />

        <div className="relative w-full h-full overflow-hidden rounded-md bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );

  if (!href) return CardContent;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            aria-label={`Ver servicios de ${title}`}
            className="focus:outline-none"
          >
            {CardContent}
          </Link>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          className="bg-[#ee6983]/15
            backdrop-blur-md
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            border border-white/40 text-black text-xs px-3 py-1.5 rounded-md"
        >
          Haz clic para ver los servicios de <strong>{title}</strong>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
