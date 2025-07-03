"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderValidation_1 = __importDefault(require("./orderValidation"));
const bookModel_1 = require("../books/bookModel");
const orderServices_1 = require("./orderServices");
const mongoose_1 = require("mongoose");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodValidation = orderValidation_1.default.safeParse(req.body);
        if (!zodValidation.success) {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errorLists,
            });
        }
        const validatedData = zodValidation.data;
        const { name, email, address, phone, items } = validatedData;
        let totalPrice = 0;
        let totalQuantity = 0;
        for (const item of items) {
            const book = yield bookModel_1.BookModel.findById(item.productId);
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
            yield book.save();
            totalPrice += item.quantity * book.newPrice; // Giả sử book có field `price`
            totalQuantity += item.quantity;
        }
        const newOrderData = {
            name,
            email,
            address,
            phone,
            items: items.map((item) => ({
                productId: new mongoose_1.Types.ObjectId(item.productId),
                quantity: item.quantity,
            })),
            totalPrice,
            quantity: totalQuantity,
        };
        const newOrder = yield orderServices_1.OrderServices.createANewOrder(newOrderData);
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newOrder,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
});
const handleGetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orders = yield orderServices_1.OrderServices.getAllOrdersFromDB(email);
        return res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: err.message,
        });
    }
});
exports.OrderController = {
    createOrder,
    handleGetAllOrders,
};
