import api from "../lib/api";

const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

const searchProducts = async (search: string) => {
  const response = await api.get("/products", { params: { search } });
  return response.data;
};

const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

const getProduct = async (id: any) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products`, { params: { category } });
  return response.data;
};

export {
  getProducts,
  getProduct,
  getProductsByCategory,
  getCategories,
  searchProducts,
};
