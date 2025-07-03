import { z } from "zod";

const orderValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    address: z.object({
        city: z.string().min(1, "City is required"),
        country: z.string().optional(),
        state: z.string().optional(),
        zipcode: z.string().optional(),
    }),
    phone: z.number().int().nonnegative("Invalid phone number"),
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive()
    }))
    ,
    totalPrice: z.number().positive("Total price must be positive"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export default orderValidationSchema;