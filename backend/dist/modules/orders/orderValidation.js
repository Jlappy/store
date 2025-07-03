"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    address: zod_1.z.object({
        city: zod_1.z.string().min(1, "City is required"),
        country: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        zipcode: zod_1.z.string().optional(),
    }),
    phone: zod_1.z.number().int().nonnegative("Invalid phone number"),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive()
    })),
    totalPrice: zod_1.z.number().positive("Total price must be positive"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.default = orderValidationSchema;
