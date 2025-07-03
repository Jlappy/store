import mongoose from 'mongoose';

import { BookModel } from './bookModel';
import { TBook } from './bookInterface';

export const createBookService = async (data: TBook) => {
    const newBook = await BookModel.create(data);
    return newBook;
};

export const getAllBooksService = async () => {
    return await BookModel.find();
};

export const getSingleBookService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return await BookModel.findById(id);
};

export const updateBookService = async (id: string, data: Partial<TBook>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return await BookModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBookService = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return await BookModel.findByIdAndDelete(id);
};