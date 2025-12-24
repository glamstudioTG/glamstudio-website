"use client";

import { useState } from "react";

import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { cn } from "@/lib/utils";

const ButtonLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<undefined | string>(undefined);

  const handleClick = async () => {
    setIsLoading(true);
    setStatus(undefined);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus(
        Math.random() > 0.5
          ? "Cita enviada a lashista!"
          : "Ups hubo un problema, intenta de nuevo."
      );
    } catch (error) {
      setStatus("Rejected!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "cursor-pointer hover:no-underline border border-[#D4AF37]  text-black px-6 py-3 rounded-lg font-medium flex items-center gap-2",
        {
          "text-green-600 dark:text-green-400":
            status === "Cita enviada a lashista!",
          "text-destructive":
            status === "Ups hubo un problema, intenta de nuevo.",
        }
      )}
    >
      {isLoading ? (
        <>
          <LoaderCircleIcon className="animate-spin" />
          Loading
        </>
      ) : status ? (
        status
      ) : (
        "Confirmar cita"
      )}
    </Button>
  );
};

export default ButtonLoading;
