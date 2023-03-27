const express = require("express");
const bookController = require("../controllers/book-controllers");

const router = express.Router();

router.get("/books", bookController.getBooks);

router.post("/book/new-book", bookController.newBook);

router.post("/book/add-book", bookController.addBook);

router.get("/book/edit-book/:bookId", bookController.postEditBook);

router.post("/book/edit-book", bookController.editBook);

router.post("/book/delete-book", bookController.deleteBook);

module.exports = router;
