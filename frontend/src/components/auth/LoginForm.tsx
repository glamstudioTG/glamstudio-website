"use client";

import { useState } from "react";
import { useLoginMutation } from "@/src/hooks/query/auth.mutations";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { Input } from "../ui/shadcn-io/input/input";

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { setSession } = useAuth();
  const loginMutation = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (user) => {
          if (user) {
            setSession(user);
          }
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-4xl font-medium font-mono">Iniciar sesión</h3>

      <Input
        className="border-[#850E35]"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        className="border-[#850E35]"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loginMutation.isError && (
        <p className="text-sm text-red-600">Credenciales incorrectas</p>
      )}

      <button
        disabled={loginMutation.isPending}
        onClick={handleSubmit}
        className="
          w-full rounded-full bg-[#850E35] text-white py-3
          disabled:opacity-50 cursor-pointer
        "
      >
        {loginMutation.isPending ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-xs text-center">
        ¿No tienes cuenta?{" "}
        <button onClick={onSwitch} className="underline cursor-pointer">
          Regístrate
        </button>
      </p>
    </div>
  );
}
