"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = exports.deleteABook = exports.UpdateBook = exports.getSingleBook = exports.getAllBooks = exports.postABook = void 0;
const BookService = __importStar(require("./bookServices"));
const bookValidation_1 = require("./bookValidation");
const postABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = bookValidation_1.BookValidationSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: result.error.flatten(),
        });
    }
    const validatedData = result.data;
    try {
        const newBook = yield BookService.createBookService(validatedData);
        return res.status(201).json({
            message: 'Book posted successfully',
            book: newBook,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to create book',
            error: error.message,
        });
    }
});
exports.postABook = postABook;
const getAllBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield BookService.getAllBooksService();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
});
exports.getAllBooks = getAllBooks;
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookService.getSingleBookService(req.params.id);
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getSingleBook = getSingleBook;
const UpdateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield BookService.updateBookService(req.params.id, req.body);
        if (!updatedBook)
            return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.UpdateBook = UpdateBook;
const deleteABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield BookService.deleteBookService(req.params.id);
        if (!deletedBook)
            return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteABook = deleteABook;
exports.BookController = {
    postABook: exports.postABook,
    getAllBooks: exports.getAllBooks,
    getSingleBook: exports.getSingleBook,
    UpdateBook: exports.UpdateBook,
    deleteABook: exports.deleteABook,
};
