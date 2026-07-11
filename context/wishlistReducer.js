export const initialWhishListItems = [];

export const wishListReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const product = action.payload;
      const isExist = state.some((item) => item.id === product.id);
      if (isExist) {
        return state.filter((item) => item.id !== product.id);
      } else {
        return [...state, product];
      }
    }
    case "DELETE_FROM_WISHLIST": {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    }
    case "CLEAR_WISHLIST": {
      return [];
    }
    default:
      return state;
  }
};
