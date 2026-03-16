import { GalleryItem } from "../../components/galery/gallery.types";

export async function validateImages(
  items: GalleryItem[],
): Promise<GalleryItem[]> {
  const checks = await Promise.all(
    items.map((item) => {
      return new Promise<GalleryItem | null>((resolve) => {
        const img = new Image();

        img.src = item.src;

        img.onload = () => resolve(item);
        img.onerror = () => resolve(null);
      });
    }),
  );

  return checks.filter(Boolean) as GalleryItem[];
}
