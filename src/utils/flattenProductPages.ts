import type { ProductsPage } from "@/api/products";
import type { Product } from "@/types/ecommerce";

// Flatten infinite-query pages into a single list, preventing duplicate
// records between batches (defensive: the API uses skip/limit, so batches
// should never overlap, but cards must never render twice either).
const flattenProductPages = (pages?: ProductsPage[]): Product[] => {
  const seen = new Set<string>();
  const flat: Product[] = [];
  for (const page of pages ?? []) {
    for (const product of page.products) {
      if (seen.has(product._id)) continue;
      seen.add(product._id);
      flat.push(product);
    }
  }
  return flat;
};

export default flattenProductPages;
