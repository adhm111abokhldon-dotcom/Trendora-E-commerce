import { Product } from "@/types/ecommerce";

export const sorting = (
  typeToSort: keyof Product,
  products: Product[],
  direction: "asc" | "desc" = "asc",
) => {
  const productsCopy = [...products];

  productsCopy.sort((a, b) => {
    const valA = a[typeToSort];
    const valB = b[typeToSort];

    if (typeof valA === "number" && typeof valB === "number") {
      return direction === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });

  return productsCopy;
};
