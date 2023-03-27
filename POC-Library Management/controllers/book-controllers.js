const Book = require("../models/book");
const alert = require("alert");

exports.getBooks = (req, res, next) => {
  Book.findAll()
    .then((books) => {
      res.render("book-views/books", {
        pageTitle: "Books",
        path: "/books",
        books: books,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBook = (req, res, next) => {
  res.render("book-views/edit-book", {
    pageTitle: "New Book",
    path: "/edit-books",
    editing: false,
    libraryId: req.body.libraryId,
  });
};

exports.addBook = (req, res, next) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    libraryId: req.body.libraryId,
  })
    .then(() => {
      alert("Added Book Successfully!");
      res.render("book-views/edit-book", {
        pageTitle: "New Book",
        path: "/edit-book",
        editing: false,
        libraryId: req.body.libraryId,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditBook = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("");
  }
  const bookId = req.params.bookId;
  Book.findByPk(bookId)
    .then((book) => {
      res.render("book-views/edit-book", {
        pageTitle: "Edit Book",
        path: "/edit-book",
        editing: true,
        book: book,
        libraryId: req.body.libraryId,
      });
    })
    .catch((err) => console.error(err));
};

exports.editBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedAuthor = req.body.author;
  const updatedISBN = req.body.isbn;
  Book.findByPk(bookId)
    .then(async (book) => {
      book.title = updatedTitle;
      book.author = updatedAuthor;
      book.isbn = updatedISBN;
      await book.save();
    })
    .then(() => {
      return Book.findAll();
    })
    .then((books) => {
      res.render("book-views/books", {
        pageTitle: "Books",
        path: "/books",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.body.bookId;
  Book.findByPk(bookId)
    .then((book) => {
      return book.destroy();
    })
    .then(() => {
      return Book.findAll();
    })
    .then((books) => {
      res.render("book-views/books", {
        pageTitle: "Books",
        path: "/books",
        books: books,
      });
    })
    .catch((err) => console.log(err));
};
