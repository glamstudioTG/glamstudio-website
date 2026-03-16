import {
  GalleryItem,
  GalleryCategory,
} from "../../components/galery/gallery.types";
import { seededShuffle } from "./gallery.shuffle";

export function buildGallery(
  items: GalleryItem[],
  filter: "todo" | GalleryCategory,
): GalleryItem[] {
  if (filter === "todo") {
    const shuffled = seededShuffle(items);
    return shuffled.slice(0, 10);
  }

  const filtered = items.filter((i) => i.category === filter);
  const rest = items.filter((i) => i.category !== filter);

  const shuffledFiltered = seededShuffle(filtered);
  const shuffledRest = seededShuffle(rest);

  const result = [...shuffledFiltered, ...shuffledRest];

  return result.slice(0, 10);
}
