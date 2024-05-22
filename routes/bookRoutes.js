const express = require("express");
const {
  getAllBooksController,
  getBookByIDController,
  createBookController,
  updateBookController,
  deleteBookController,
  getGenresController,
  getAuthorsController,
  getTitlesController,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//* GET ALL BOOKS || GET || /api/v1/books
router.get("/", getAllBooksController);

//* GET BOOK BY ID || GET || /api/v1/books/:id
router.get("/:id", getBookByIDController);

//* CREATE A NEW BOOK || POST || /api/v1/books
router.post("/", authMiddleware, createBookController);

//* UPDATE A BOOK BY ID  || PUT |\ /api/v1/books/:id
router.put("/:id", authMiddleware, updateBookController);

//* DELETE A BOOK BY ID || DELETE |\ /api/v1/books/:id
router.delete("/:id", authMiddleware, deleteBookController);

//* FILTER FOR BOOK GENRES || GET || /api/v1/books/filter/genres
router.get("/filter/genres", authMiddleware, getGenresController);

//* FILTER FOR BOOK AUTHORS || GET || /api/v1/books/filter/authors
router.get("/filter/authors", authMiddleware, getAuthorsController);

//* FILTER FOR BOOK TITLES || GET || /api/v1/books/filter/titles
router.get("/filter/titles", authMiddleware, getTitlesController);

module.exports = router;
