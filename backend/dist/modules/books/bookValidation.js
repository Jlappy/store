"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidationSchema = void 0;
const zod_1 = require("zod");
exports.BookValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    trending: zod_1.z.boolean(),
    coverImage: zod_1.z.string().url('Cover image must be a valid URL'),
    oldPrice: zod_1.z.number().nonnegative('Old price must be a positive number'),
    newPrice: zod_1.z.number().nonnegative('New price must be a positive number'),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().nonnegative('Quantity must be positive'),
        inStock: zod_1.z.boolean().optional(),
    }),
});
