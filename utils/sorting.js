export const sortByPrice = (typeToSort, products, direction = "asc") => {
  const productsCopy = [...products];

  productsCopy.sort((a, b) => {
    if (direction === "desc") {
      return a[typeToSort] - b[typeToSort];
    } else if (direction === "asc") {
      return b[typeToSort] - a[typeToSort];
    }
  });
  return productsCopy.map((item) => item.price);
};
