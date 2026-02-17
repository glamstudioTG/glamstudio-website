"use client";

import { useState } from "react";
import { useLoginMutation } from "@/src/hooks/query/auth.mutations";
import { useAuth } from "@/src/hooks/auth/AuthContext";
import { Input } from "../ui/shadcn-io/input/input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const { setSession } = useAuth();
  const loginMutation = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>();

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.includes("@")) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (user) => {
          if (user) {
            setSession(user);

            setEmail("");
            setPassword("");
            setErrors(undefined);

            onSuccess();
          }
        },
        onError: () => {
          setErrors({
            general: "Correo o contraseña incorrectos",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-9">
      <h3 className="text-5xl font-medium font-mono">Iniciar sesión</h3>

      <div>
        <Input
          className="border-[#850E35]"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors?.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            className="border-[#850E35] pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-0 h-full flex items-center text-gray-500"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {errors?.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      {errors?.general && (
        <p className="text-sm text-red-600">{errors.general}</p>
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

      <p className="text-sm text-center">
        ¿No tienes cuenta?{" "}
        <button
          onClick={onSwitch}
          className="underline cursor-pointer text-[#850E35]"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
}
