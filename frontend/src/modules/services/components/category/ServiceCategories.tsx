import { categoriesMock } from "./category.data";
import ServiceCategoryCard from "./ServiceCategoryCard";
import Image from "next/image";
import shadowBg from "@/public/images/services/shadowBgServuices.png";

export default function ServiceCategories() {
  return (
    <div className="flex flex-col gap-36 relative">
      {categoriesMock.map((category, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={category.id}
            className={`relative flex ${
              isEven ? "justify-start" : "justify-end"
            }`}
          >
            <Image
              src={shadowBg}
              alt=""
              aria-hidden
              className={`
                pointer-events-none select-none absolute top-1/2
                -translate-y-[70%]
                ${
                  isEven
                    ? "-left-50 -translate-x-[30%]"
                    : "-right-28 translate-x-[30%]"
                }
                ${isEven ? "" : "scale-x-[-1]"}
                blur-sm
              `}
            />

            <div className="relative z-10 max-w-4xl w-full">
              <ServiceCategoryCard
                category={category}
                direction={isEven ? "normal" : "reverse"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
