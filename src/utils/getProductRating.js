export const getProductRating = (productRating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (productRating >= i) {
      stars.push("full");
    } else if (productRating >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
};

export default getProductRating;
