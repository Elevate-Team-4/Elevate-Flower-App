declare type AddProductReviewResponse = {
  _id: string;
  product: string; // ID of the product
  user: string; // ID of the user
  rating: number;
  title: string;
  comment: string;
  status: "pending" | "approved" | "rejected"; // assuming possible statuses
  createdAt: string; // ISO date string
  updatedAt: string;
  __v: number;
};
