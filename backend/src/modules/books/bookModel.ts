import { Schema, model } from "mongoose";
import { TBook } from "./bookInterface";
import { IInventory } from "./bookInterface";

const InventorySchema = new Schema<IInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { _id: false }
);


const BookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    trending: { type: Boolean, required: true },
    coverImage: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    inventory: { type: InventorySchema, required: true },
  },
  { timestamps: true }
);

export const BookModel = model<TBook>('Book', BookSchema);

