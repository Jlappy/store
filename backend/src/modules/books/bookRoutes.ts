import express from "express";
import { BookController } from "./bookControler"
import verifyAdminToken from "../middleware/verifyAdminToken"

const router = express.Router();

// POST: Create a book (admin only)
router.post("/create-book", verifyAdminToken, BookController.postABook);

// GET: Get all books
router.get("/", BookController.getAllBooks);

// GET: Get a single book by ID
router.get("/:id", BookController.getSingleBook);

// PUT: Update a book by ID (admin only)
router.put("/edit/:id", verifyAdminToken, BookController.UpdateBook);

// DELETE: Delete a book by ID (admin only)
router.delete("/:id", verifyAdminToken, BookController.deleteABook);

export default router;

