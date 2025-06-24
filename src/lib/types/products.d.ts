// Single Product
export type Product = {
  rateAvg: number;
  rateCount: number;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  sold?: number;
  id: string;
} & DataBaseProbs;

// Array of Products
export type Products = {
  products: Product[];
};

// Product Search Params Type
export type SearchParamProduct = {
  // ! Product attributes (optional filters or exact match)
  rateAvg?: number; // Average rating (exact match)
  rateCount?: number; // Number of ratings (exact match)
  _id?: string; // Product MongoDB ID
  title?: string; // Product title (exact match or partial match depending on implementation)
  slug?: string; // SEO-friendly URL identifier
  description?: string; // Product description (exact match or partial)
  // imgCover?: string; // Cover image URL
  // images?: string; // Single image URL (exact match)
  price?: number; // Price (exact match)
  priceAfterDiscount?: number; // Price after applying discount (exact match)
  quantity?: number; // Available quantity (exact match)
  category?: string; // Category ID (used to filter)
  occasion?: string; // Occasion ID (used to filter)
  isSuperAdmin?: boolean; // Admin flag (if filtering by admin-only products)
  sold?: number; // Number of units sold (exact match)
  id?: string; // Product ID alias (same as _id)

  // !Range filters (e.g., price, rating, quantity)
  "price[gte]"?: number; // Filter: price greater than or equal to
  "price[lte]"?: number; // Filter: price less than or equal to
  "rateAvg[gte]"?: number; // Filter: average rating greater than or equal to
  "rateCount[lte]"?: number; // Filter: number of ratings less than or equal to
  "priceAfterDiscount[lte]"?: number; // Filter: discounted price less than or equal to
  "sold[lte]"?: number; // Filter: sold quantity less than or equal to
  "quantity[lte]"?: number; // Filter: quantity less than or equal to
} & CommonSearchParams;
