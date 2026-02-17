"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { motion } from "framer-motion";

export default function AuthDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle />

      <DialogContent
        className="
        w-full
        max-w-lg
        text-black

        md:rounded-2xl
        md:bg-[#FFB0C0]/90
        md:border
        md:border-[#850E35]

        max-md:fixed
        max-md:bottom-0
        max-md:left-0
        max-md:right-0
        max-md:top-auto
        max-md:translate-x-0
        max-md:translate-y-0
        max-md:h-[65vh]
        max-md:rounded-t-3xl
        max-md:rounded-b-none
        max-md:bg-white
        max-md:border-none
        max-md:shadow-2xl
        max-md:p-0
      "
      >
        <motion.div
          className="h-full p-6 md:p-0"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 28,
          }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.18}
          onDragEnd={(event, info) => {
            if (info.offset.y > 120 || info.velocity.y > 600) {
              onOpenChange(false);
            }
          }}
        >
          <div className="flex justify-center mb-4 md:hidden">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {mode === "login" ? (
            <LoginForm
              onSwitch={() => setMode("register")}
              onSuccess={() => onOpenChange(false)}
            />
          ) : (
            <RegisterForm onSwitch={() => setMode("login")} />
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
