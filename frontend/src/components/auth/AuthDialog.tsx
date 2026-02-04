"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthDialog({ trigger }: { trigger: React.ReactNode }) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogTitle> </DialogTitle>
      <DialogContent className="bg-[#FFB0C0]/90 text-black rounded-2xl border-[#850E35] p-6">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitch={() => setMode("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
