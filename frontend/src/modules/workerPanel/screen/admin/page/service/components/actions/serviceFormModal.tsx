"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUploadThing } from "@/src/lib/client/uploadthing";
import { Spinner } from "@/src/components/ui/shadcn-io/spinner/spinner";
import { useCloudinaryUpload } from "../../../../hooks/cloudinary/useCloudinaryUpload";

export interface ServiceFormValues {
  name: string;
  categoryId: string;
  price: string;
  duration: string;
  description?: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  title: string;
  categories: Category[];
  initialValues?: Partial<ServiceFormValues>;
  onClose: () => void;
  onSubmit: (values: ServiceFormValues) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  isDeleting?: boolean;
}

export function ServiceFormModal({
  open,
  title,
  categories,
  initialValues,
  onClose,
  onSubmit,
  onDelete,
  isSubmitting,
  isDeleting,
}: Props) {
  const [form, setForm] = useState<ServiceFormValues>({
    name: "",
    categoryId: "",
    price: "",
    duration: "",
    description: "",
    image: "",
  });

  const { upload, isUploading } = useCloudinaryUpload();

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name ?? "",
        categoryId: initialValues.categoryId ?? "",
        price: initialValues.price ?? "",
        duration: initialValues.duration ?? "",
        description: initialValues.description ?? "",
        image: initialValues.image ?? "",
      });
    }
  }, [initialValues]);

  if (!open) return null;

  const handleChange = (key: keyof ServiceFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const imageUrl = await upload(files[0]);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (err) {
      console.error("Error subiendo imagen:", err);
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
          <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 text-black"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-neutral-700">
              Imagen del Servicio
            </label>

            <div className="relative">
              <label
                className={`
        w-full h-44 rounded-lg border-2 border-dashed 
        flex items-center justify-center text-sm
        transition cursor-pointer overflow-hidden
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
                  <div className="flex flex-col items-center gap-2 text-neutral-500">
                    <span className="text-sm font-medium">
                      Sube la imagen aquí
                    </span>
                    <span className="text-xs text-neutral-400">
                      PNG, JPG hasta 4MB
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                />
              </label>

              {isUploading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <p className="text-sm text-neutral-600">Subiendo imagen...</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-700">
              Nombre del Servicio
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-neutral-200 text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#850E35]/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Categoría</label>
            <select
              value={form.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className="w-full border border-neutral-200 text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#850E35]/20"
            >
              <option value="">Seleccionar categoría...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Precio"
              className="border border-neutral-200 text-black rounded-md px-3 py-2 text-sm"
            />

            <input
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="Duración"
              className="border border-neutral-200 text-black rounded-md px-3 py-2 text-sm"
            />
          </div>

          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Descripción"
            className="w-full border border-neutral-200 rounded-md px-3 text-black py-2 text-sm resize-none"
          />
        </div>

        <div className="flex justify-between px-6 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-xl">
          {onDelete && (
            <button
              disabled={isDeleting}
              onClick={onDelete}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDeleting && <Spinner />}
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          )}

          <div className="flex gap-3">
            <button
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border text-black border-neutral-200 hover:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-md bg-[#850E35] text-white hover:bg-[#6d0c2c] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Guardando..." : "Guardar Servicio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
