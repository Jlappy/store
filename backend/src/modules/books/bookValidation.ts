import { z } from 'zod';

export const BookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  trending: z.boolean(),
  coverImage: z.string().url('Cover image must be a valid URL'),
  oldPrice: z.number().nonnegative('Old price must be a positive number'),
  newPrice: z.number().nonnegative('New price must be a positive number'),

  inventory: z.object({
    quantity: z.number().nonnegative('Quantity must be positive'),
    inStock: z.boolean().optional(),
  }),
});
