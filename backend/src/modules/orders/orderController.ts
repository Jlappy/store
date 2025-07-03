import { Request, Response } from "express";
import orderValidationSchema from "./orderValidation";
import { BookModel } from "../books/bookModel";
import { OrderServices } from "./orderServices";
import { z } from "zod";
import { Types } from "mongoose";

// Định nghĩa kiểu từ Zod
type TOrderInput = z.infer<typeof orderValidationSchema>;

const createOrder = async (req: Request, res: Response) => {
  try {
    const zodValidation = orderValidationSchema.safeParse(req.body);

    if (!zodValidation.success) {
      const errorLists = zodValidation.error.issues.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorLists,
      });
    }

    const validatedData: TOrderInput = zodValidation.data;
    const { name, email, address, phone, items } = validatedData;

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const item of items) {
      const book = await BookModel.findById(item.productId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Book with ID ${item.productId} not found`,
        });
      }

      if (book.inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient quantity for book "${book.title}"`,
        });
      }

      // Trừ tồn kho
      book.inventory.quantity -= item.quantity;
      book.inventory.inStock = book.inventory.quantity > 0;
      await book.save();

      totalPrice += item.quantity * book.newPrice; // Giả sử book có field `price`
      totalQuantity += item.quantity;
    }

    const newOrderData = {
      name,
      email,
      address,
      phone,
      items: items.map((item) => ({
        productId: new Types.ObjectId(item.productId),
        quantity: item.quantity,
      })),
      totalPrice,
      quantity: totalQuantity,
    };

    const newOrder = await OrderServices.createANewOrder(newOrderData);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const handleGetAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const orders = await OrderServices.getAllOrdersFromDB(email);
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

export const OrderController = {
  createOrder,
  handleGetAllOrders,
};
