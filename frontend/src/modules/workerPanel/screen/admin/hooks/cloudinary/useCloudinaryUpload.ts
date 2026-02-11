import { useState } from "react";
import { uploadImageToCloudinary } from "@/src/lib/cloudinary/uploadImage";

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File) => {
    try {
      setIsUploading(true);
      const url = await uploadImageToCloudinary(file);
      return url;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
