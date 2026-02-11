"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner/spinner";
import { useCloudinaryUpload } from "../../../../hooks/cloudinary/useCloudinaryUpload";

export interface CategoryFormValues {
  name: string;
  description?: string;
  image?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void;
  isLoading?: boolean;
}

export function CategoryFormModal({
  open,
  onClose,
  onSubmit,
  isLoading,
}: Props) {
  const [form, setForm] = useState<CategoryFormValues>({
    name: "",
    description: "",
    image: "",
  });

  const { upload, isUploading } = useCloudinaryUpload();

  if (!open) return null;

  const handleChange = (key: keyof CategoryFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await upload(file);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-xl border border-neutral-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">
            Nueva Categoría
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer text-black"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-neutral-700">
              Imagen de la Categoría
            </label>

            <div className="relative">
              <label
                className={`
                  w-full h-40 rounded-lg border-2 border-dashed
                  flex items-center justify-center text-sm
                  cursor-pointer overflow-hidden transition
                  ${
                    form.image
                      ? "border-transparent"
                      : "border-neutral-300 bg-neutral-100 hover:bg-neutral-200"
                  }
                `}
              >
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-neutral-500 text-center">
                    <p className="font-medium">Sube la imagen aquí</p>
                    <p className="text-xs text-neutral-400">
                      PNG o JPG hasta 4MB
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                />
              </label>
              {isUploading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <Spinner />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-700">
              Nombre de la Categoría
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-neutral-200 text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#850E35]/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Descripción</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-neutral-200 rounded-md px-3 text-black py-2 text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border cursor-pointer text-black border-neutral-200 hover:bg-neutral-100"
          >
            Cancelar
          </button>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md cursor-pointer bg-[#850E35] text-white hover:bg-[#6d0c2c] transition flex items-center gap-2"
          >
            {isLoading && <Spinner />}
            Guardar Categoría
          </button>
        </div>
      </div>
    </div>
  );
}
