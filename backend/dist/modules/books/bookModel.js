"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
}, { _id: false });
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    trending: { type: Boolean, required: true },
    coverImage: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    inventory: { type: InventorySchema, required: true },
}, { timestamps: true });
exports.BookModel = (0, mongoose_1.model)('Book', BookSchema);
