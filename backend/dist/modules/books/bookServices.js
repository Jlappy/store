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
exports.deleteBookService = exports.updateBookService = exports.getSingleBookService = exports.getAllBooksService = exports.createBookService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookModel_1 = require("./bookModel");
const createBookService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield bookModel_1.BookModel.create(data);
    return newBook;
});
exports.createBookService = createBookService;
const getAllBooksService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bookModel_1.BookModel.find();
});
exports.getAllBooksService = getAllBooksService;
const getSingleBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return yield bookModel_1.BookModel.findById(id);
});
exports.getSingleBookService = getSingleBookService;
const updateBookService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return yield bookModel_1.BookModel.findByIdAndUpdate(id, data, { new: true });
});
exports.updateBookService = updateBookService;
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
    }
    return yield bookModel_1.BookModel.findByIdAndDelete(id);
});
exports.deleteBookService = deleteBookService;
