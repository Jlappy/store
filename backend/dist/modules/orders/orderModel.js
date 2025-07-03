"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
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
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
