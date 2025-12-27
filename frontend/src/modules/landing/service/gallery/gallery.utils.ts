import {
  GalleryItem,
  GalleryCategory,
} from "../../components/galery/gallery.types";

export function buildGallery(
  items: GalleryItem[],
  filter: "todo" | GalleryCategory
): GalleryItem[] {
  if (filter === "todo") {
    return items.slice(0, 10);
  }

  const filtered = items.filter((i) => i.category === filter);
  const rest = items.filter((i) => i.category !== filter);

  return [...filtered, ...rest].slice(0, 10);
}
