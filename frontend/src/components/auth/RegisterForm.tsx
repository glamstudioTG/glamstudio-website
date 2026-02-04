"use client";

import { useState } from "react";
import { useRegisterMutation } from "@/src/hooks/query/auth.mutations";
import { Input } from "../ui/shadcn-io/input/input";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const registerMutation = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = () => {
    registerMutation.mutate(form, {
      onSuccess: () => onSwitch(),
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Crear cuenta</h3>

      {Object.entries(form).map(([key, value]) => (
        <Input
          className="border-[#850E35]"
          key={key}
          placeholder={key}
          value={value}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        />
      ))}

      {registerMutation.isError && (
        <p className="text-sm text-red-600">Error al registrar usuario</p>
      )}

      <button
        disabled={registerMutation.isPending}
        onClick={handleSubmit}
        className="w-full rounded-full bg-[#850E35] text-white py-3 cursor-pointer"
      >
        {registerMutation.isPending ? "Creando..." : "Registrarse"}
      </button>

      <p className="text-xs text-center">
        ¿Ya tienes cuenta?{" "}
        <button onClick={onSwitch} className="underline cursor-pointer">
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
