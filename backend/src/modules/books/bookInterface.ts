import { Types } from "mongoose";

export interface IInventory {
  quantity: number;
  inStock?: boolean;
}

export type TBook = {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  trending: boolean;
  coverImage: string;
  oldPrice: number;
  newPrice: number;
  inventory: IInventory;
  createdAt?: Date;
  updatedAt?: Date;
}
