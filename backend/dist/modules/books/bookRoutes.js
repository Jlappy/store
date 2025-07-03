"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControler_1 = require("./bookControler");
const verifyAdminToken_1 = __importDefault(require("../middleware/verifyAdminToken"));
const router = express_1.default.Router();
// POST: Create a book (admin only)
router.post("/create-book", verifyAdminToken_1.default, bookControler_1.BookController.postABook);
// GET: Get all books
router.get("/", bookControler_1.BookController.getAllBooks);
// GET: Get a single book by ID
router.get("/:id", bookControler_1.BookController.getSingleBook);
// PUT: Update a book by ID (admin only)
router.put("/edit/:id", verifyAdminToken_1.default, bookControler_1.BookController.UpdateBook);
// DELETE: Delete a book by ID (admin only)
router.delete("/:id", verifyAdminToken_1.default, bookControler_1.BookController.deleteABook);
exports.default = router;
