import { Schema, model, Types } from 'mongoose';
import { IOrder } from './orderInterface';

const OrderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      country: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    phone: { type: Number, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, required: true }
      }
    ],
      totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  },
{
  timestamps: true,
  }
);

export const OrderModel = model<IOrder>('Order', OrderSchema);
