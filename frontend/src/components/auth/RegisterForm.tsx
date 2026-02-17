"use client";

import { useState } from "react";
import { useRegisterMutation } from "@/src/hooks/query/auth.mutations";
import { Input } from "../ui/shadcn-io/input/input";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const registerMutation = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";

    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";

    if (form.phone.length < 7) newErrors.phone = "Número inválido";

    if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    registerMutation.mutate(form, {
      onSuccess: () => onSwitch(),
    });
  };

  return (
    <div className="space-y-7">
      <h3 className="text-5xl font-medium font-mono">Crear cuenta</h3>

      <div>
        <Input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-0 h-full flex items-center text-gray-500"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <button
        disabled={registerMutation.isPending}
        onClick={handleSubmit}
        className="w-full rounded-full bg-[#850E35] text-white py-3"
      >
        {registerMutation.isPending ? "Creando..." : "Registrarse"}
      </button>

      <p className="text-sm text-center">
        ¿Ya tienes cuenta?{" "}
        <button onClick={onSwitch} className="underline text-[#850E35]">
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
