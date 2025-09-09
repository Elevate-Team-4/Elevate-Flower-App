import { Product } from "./products";

export type Orders = {
  orders: Order[];
};

export type Order = {
  user: string;
  orderItems: OrderItemType[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  orderNumber: string;
} & DataBaseProbs;

export type OrderItemType = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};
