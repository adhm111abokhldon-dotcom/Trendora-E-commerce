import api from "../lib/api";
import { Product } from "../types/ecommerce";

export type ProductsPage = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

type ProductsResponse = {
  status: string;
  data: {
    products: Product[];
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
};
type ProductResponse = { status: string; data: { product: Product } };
type CategoriesResponse = { status: string; data: { categories: string[] } };

export type ProductsQuery = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
  minRating?: number;
};

// One page of products from our backend (database-side pagination).
const getProductsPage = async (params?: ProductsQuery): Promise<ProductsPage> => {
  const response = await api.get<ProductsResponse>("/products", { params });
  const { products, total, page, limit, hasMore } = response.data.data;
  return {
    products,
    total: total ?? products.length,
    page: page ?? params?.page ?? 1,
    limit: limit ?? params?.limit ?? 10,
    hasMore: hasMore ?? false,
  };
};

// Plain-array helper kept for compatibility with existing consumers.
const getProducts = async (params?: ProductsQuery): Promise<Product[]> => {
  const page = await getProductsPage(params);
  return page.products;
};

const searchProducts = async (
  search: string,
  options?: { page?: number; limit?: number },
): Promise<ProductsPage> => {
  return getProductsPage({ search, ...options });
};

const getCategories = async (): Promise<string[]> => {
  const response = await api.get<CategoriesResponse>("/products/categories");
  return response.data.data.categories;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get<ProductResponse>(`/products/${id}`);
  return response.data.data.product;
};

export {
  getProducts,
  getProductsPage,
  getProduct,
  getCategories,
  searchProducts,
};


