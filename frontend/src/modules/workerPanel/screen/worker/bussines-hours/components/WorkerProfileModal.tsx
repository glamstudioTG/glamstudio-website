"use client";

import { useEffect, useRef, useState, DragEvent } from "react";
import { useWorker } from "../hooks/worker/useWorker";
import { useUpdateWorkerProfile } from "../hooks/worker/useUpdateWorkerProfile";
import { useUpdateWorkerCategories } from "../hooks/worker/useUpdateWorkerCategories";
import { CategorySelectorModal } from "./CategorySelectorModal";
import { Camera, X, Loader2 } from "lucide-react";
import { useCloudinaryUpload } from "../../../admin/hooks/cloudinary/useCloudinaryUpload";

interface Props {
  open: boolean;
  onClose: () => void;
  workerId: string;
}

export function WorkerProfileModal({ open, onClose, workerId }: Props) {
  const { data: worker } = useWorker(workerId);

  const updateProfile = useUpdateWorkerProfile(workerId);
  const updateCategories = useUpdateWorkerCategories(workerId);
  const { upload, isUploading } = useCloudinaryUpload();

  const [bio, setBio] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (worker) {
      setBio(worker.bio ?? "");
      setAvatarPreview(worker.avatar ?? "");
    }
  }, [worker]);

  if (!open) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = async () => {
    let finalAvatarUrl = worker?.avatar ?? null;

    try {
      if (avatarFile) {
        finalAvatarUrl = await upload(avatarFile);
      }

      updateProfile.mutate({
        bio,
        avatar: finalAvatarUrl ?? undefined,
      });

      onClose();
    } catch (error) {
      console.error("Error uploading avatar", error);
    }
  };

  const handleAddCategories = (ids: string[]) => {
    updateCategories.mutate(ids);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 md:px-6 py-4 border-b">
          <h2 className="text-base md:text-lg font-semibold text-neutral-800">
            Perfil Profesional
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-5 md:p-6">
          {/* IMAGE SECTION */}
          <div className="flex flex-col items-center gap-4 w-full md:w-40 shrink-0">
            <div
              onClick={openFileSelector}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center cursor-pointer transition hover:border-[#850E35]"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Camera size={26} className="text-neutral-400" />
              )}
            </div>

            <button
              type="button"
              onClick={openFileSelector}
              className="text-xs px-3 py-1.5 rounded-md border text-[#850E35] border-[#850E35] hover:bg-[#850E35] hover:text-white transition"
            >
              Subir foto
            </button>

            <p className="text-[10px] text-neutral-400 text-center">
              JPG o PNG · máx 2MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>

          {/* INFO SECTION */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="text-xs font-semibold text-neutral-700">
                Biografía profesional
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="mt-2 w-full border text-black rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#850E35]/20"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-semibold text-neutral-700">
                  Servicios y habilidades
                </h3>

                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="text-[11px] px-3 py-1 rounded-md text-black font-bold bg-neutral-100 hover:bg-neutral-300 transition"
                >
                  Agregar
                </button>
              </div>

              <div className="border rounded-lg p-3 border-gray-300 flex flex-wrap gap-2 min-h-11">
                {worker?.categories.map((c) => (
                  <span
                    key={c.categoryId}
                    className="text-[11px] bg-[#850E35] text-white px-2 py-1 rounded-full"
                  >
                    {c.category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={isUploading || updateProfile.isPending}
                className="px-5 py-2 rounded-md bg-[#850E35] text-white text-sm hover:opacity-90 transition flex items-center gap-2"
              >
                {(isUploading || updateProfile.isPending) && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                Guardar cambios
              </button>
            </div>
          </div>
        </div>

        {showCategoryModal && worker && (
          <CategorySelectorModal
            onClose={() => setShowCategoryModal(false)}
            onSelect={handleAddCategories}
            selected={worker.categories.map((c) => c.categoryId)}
          />
        )}
      </div>
    </div>
  );
}
