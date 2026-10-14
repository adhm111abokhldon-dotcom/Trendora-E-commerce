export type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand?: string;
  sku?: string;
  weight?: number;
  tags?: string[];
  images: string[];
  thumbnail?: string;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  meta?: {
    createdAt: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
  };
};

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product;

export type User = {
  id: string;
  username: string;
  name?: string;
  email?: string;
};

