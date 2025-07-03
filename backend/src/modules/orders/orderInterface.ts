import { Types } from "mongoose";

export interface IOrder {
  name: string;
  email: string;
  address: {
    city: string;
    country?: string;
    state?: string;
    zipcode?: string;
  };
  phone: number;
  items: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
