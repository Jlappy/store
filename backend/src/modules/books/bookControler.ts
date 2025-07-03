import { Request, Response } from 'express';
import * as BookService from './bookServices';
import { BookValidationSchema } from './bookValidation';
import { z } from 'zod';


type TBookInput = z.infer<typeof BookValidationSchema>;


export const postABook = async (req: Request, res: Response) => {
  const result = BookValidationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.flatten(),
    });
  }

  const validatedData: TBookInput = result.data;

  try {
    const newBook = await BookService.createBookService(validatedData);
    return res.status(201).json({
      message: 'Book posted successfully',
      book: newBook,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: 'Failed to create book',
      error: error.message,
    });
  }
};



export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooksService();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.getSingleBookService(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const UpdateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await BookService.updateBookService(req.params.id, req.body);
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteABook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await BookService.deleteBookService(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const BookController = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
};


