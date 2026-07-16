export const sorting = (typeToSort, products, direction = "asc") => {
  const productsCopy = [...products];

  productsCopy.sort((a, b) => {
    if (direction === "asc") {
      return a[typeToSort] - b[typeToSort];
    } else if (direction === "desc") {
      return b[typeToSort] - a[typeToSort];
    }
  });
  return productsCopy;
};
