export type Product = {
  id: number;
  availabilityStatus: "In Stock" | "Out of Stock";
  brand: string;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  stock: number;
  reviews: {
    reviewerEmail: string;
    reviewerName: string;
    comment: string;
    rating: number;
    date: string;
  }[];
  discountPercentage: number;
  meta: {
    createdAt: string;
    updatedAt?: string;
  };
};

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product;
