"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, UserCheck } from "lucide-react";
import { Switch } from "@/src/components/ui/shadcn-io/switched/switch";
import { useSearchUserByEmail } from "../../../hooks/users/useSearchUserByEmail";
import { useChangeUserRole } from "../../../hooks/users/useChangeUserRole";
import { Role } from "../../../types/user.types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/shadcn-io/dialog/dialog";

interface FoundUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
interface AddWorkerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWorkerModal({ open, onOpenChange }: AddWorkerModalProps) {
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [isWorker, setIsWorker] = useState(false);

  const searchUserMutation = useSearchUserByEmail();
  const changeRoleMutation = useChangeUserRole();

  const handleSearch = async () => {
    setFoundUser(null);
    setIsWorker(false);

    try {
      const users = await searchUserMutation.mutateAsync(email);
      const user = users[0];

      setFoundUser(user);
      setIsWorker(user.role === "WORKER");
    } catch {
      setFoundUser(null);
    }
  };

  const handleConfirm = async () => {
    if (!foundUser) return;

    try {
      await changeRoleMutation.mutateAsync({
        userId: foundUser.id,
        role: isWorker ? "WORKER" : "CLIENT",
      });

      onOpenChange(false);
      setEmail("");
      setFoundUser(null);
      setIsWorker(false);
    } catch (error) {
      console.error("Error asignando rol", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-neutral-200 bg-[#fcd9df]/95">
        <DialogHeader>
          <DialogTitle className="text-[#850E35]">
            Añadir nuevo trabajador
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Buscar por correo
          </label>

          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="
                flex-1 rounded-md border border-[#850E35]
                px-3 py-2 text-sm text-black
                focus:outline-none focus:ring-2
                focus:ring-[#850E35]/30
              "
            />

            <button
              onClick={handleSearch}
              disabled={!email || searchUserMutation.isPending}
              className="
                rounded-md bg-[#850E35] px-4 py-2
                text-sm font-medium text-white
                disabled:opacity-50
              "
            >
              {searchUserMutation.isPending ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {foundUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="
                mt-4 flex items-center justify-between
                rounded-lg border border-neutral-200
                bg-[#fff5f7] p-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-pink-100">
                  <Mail className="h-5 w-5 text-pink-600" />
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    {foundUser.name}
                  </p>
                  <p className="text-xs text-neutral-500">{foundUser.email}</p>
                  <p className="text-xs text-[#850E35]">{foundUser.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-medium transition ${
                    isWorker ? "text-[#850E35]" : "text-neutral-500"
                  }`}
                >
                  {isWorker ? "Asignado" : "No asignado"}
                </span>

                <Switch
                  size="default"
                  checked={isWorker}
                  onCheckedChange={setIsWorker}
                  className="
      data-[state=checked]:bg-[#850E35]
      data-[state=unchecked]:bg-neutral-300
    "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm text-neutral-600"
          >
            Cancelar
          </button>

          <button
            disabled={!foundUser || changeRoleMutation.isPending}
            onClick={handleConfirm}
            className="
              rounded-md bg-[#850E35] px-4 py-2
              text-sm font-medium text-white
              disabled:opacity-40
            "
          >
            {changeRoleMutation.isPending ? "Asignando..." : "Confirmar"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
