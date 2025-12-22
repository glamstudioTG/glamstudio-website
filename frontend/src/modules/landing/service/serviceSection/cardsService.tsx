import { CardServiceProps } from "./types";
import Image from "next/image";
import clsx from "clsx";

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
}: CardServiceProps) {
  return (
    <div className="group flex flex-col items-center text-center gap-3">
      <h3 className="text-xl text-black font-sans">{title}</h3>

      <span className="text-sm text-gray-600">{price}</span>

      <div className="w-50 h-px bg-[#D4AF37] my-1" />

      <p className="text-sm text-gray-700 max-w-xs ">{description}</p>

      <div className="relative w-[237px] h-[345px] mt-4">
        <div
          className={clsx(
            "absolute inset-0 rounded-md border-2 border-[#d6b980]",
            "transition-all duration-500 ease-out",
            frameOffsetMap[framePosition as keyof typeof frameOffsetMap] || "",
            "group-hover:translate-x-0 group-hover:translate-y-0",
            "group-hover:shadow-[0_25px_25px_rgba(214,185,128,1)]"
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
}
