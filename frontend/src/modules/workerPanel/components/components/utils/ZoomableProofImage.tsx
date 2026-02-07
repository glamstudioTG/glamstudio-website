import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  thumbnailClassName?: string;
};

export default function ZoomableProofImage({
  src,
  alt = "Comprobante de pago",
  thumbnailClassName,
}: Props) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src={src}
            alt={alt}
            width={40}
            height={56}
            className={
              thumbnailClassName ?? "h-12 w-10 rounded-md border object-cover"
            }
          />
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="border-0 bg-transparent p-0"
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="
              relative
              w-full
              max-w-105
              sm:max-w-120
              rounded-3xl
              bg-white/25
              backdrop-blur-2xl
              shadow-2xl
              ring-1 ring-white/30
              p-4 sm:p-8
            "
          >
            <DialogClose
              className="
                absolute right-3 top-3
                rounded-full
                bg-white/60
                cursor-pointer
                p-1.5
                text-gray-900
                backdrop-blur-md
                shadow
                hover:bg-white/80
                transition
              "
            >
              <X size={18} />
            </DialogClose>

            <div className="flex justify-center">
              <div className="relative max-h-[70vh] w-full">
                <Image
                  src={src}
                  alt={alt}
                  width={900}
                  height={1200}
                  className="
                    mx-auto
                    h-auto
                    max-h-[70vh]
                    w-auto
                    rounded-2xl
                    object-contain
                  "
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
