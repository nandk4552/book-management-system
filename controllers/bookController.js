const bookModel = require("../models/bookModel");

//get all books controller
const getAllBooksController = async (req, res) => {
  try {
    // getting  all the books
    const books = await bookModel.find();
    // validation whether books exist or not
    if (!books) {
      return res.status(404).send({
        success: false,
        message: "Books not found",
      });
    }
    //returning all the books
    return res.status(200).send({
      success: true,
      message: "All books fetched successfully",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all books API",
      error,
    });
  }
};
// get books created by user from db
const getAllBooksByUserIDController = async (req, res) => {
  try {
    // getting  all the books created by user
    const books = await bookModel.find({ user: req.body.id });
    // validation whether books exist or not
    if (!books) {
      return res.status(404).send({
        success: false,
        message: "Books not found",
      });
    }
    //returning all the books
    return res.status(200).send({
      success: true,
      message: "All books fetched successfully",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all books API",
      error,
    });
  }
};

//get book by id controller
const getBookByIDController = async (req, res) => {
  try {
    // getting book id from url
    const { id } = req.params;
    //checking whether bookid exists
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Book ID not found",
      });
    }
    //getting single book id from db
    const book = await bookModel.findById(id);
    // validation whether book exists or not
    if (!book)
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    //returning single book with success response
    return res.status(200).send({
      success: true,
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get book by ID API",
      error,
    });
  }
};

//create a new book controller
const createBookController = async (req, res) => {
  try {
    // getting all the required info from the user form
    const user = req.body.id;
    const { title, author, genre, yearPublished, image } = req.body;
    //validating the info
    if (!title || !author || !genre || !yearPublished || !user) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }
    //creating a new book object
    const newBook = new bookModel({
      title,
      author,
      genre,
      yearPublished,
      image,
      user,
    });
    //saving the new book to the db
    await newBook.save();
    res.status(201).send({
      success: true,
      message: "Book created successfully",
      newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating a new book API",
      error,
    });
  }
};

// update a book by book id controller
const updateBookController = async (req, res) => {
  try {
    // getting book id from url
    const { id } = req.params;
    //getting book info from user
    const { title, author, genre, yearPublished, image } = req.body;
    //checking whether bookid exists
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Book ID not found",
      });
    }
    //check whether book exists with id
    const existBook = await bookModel.findById({ _id: id });
    if (!existBook) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    //update book info if exist in db
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { title, author, genre, yearPublished, image },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send({
        success: true,
        message: "Book not found",
      });
    }
    //sucess response after book has been updated
    res.status(200).send({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating a book by book id API",
      error,
    });
  }
};
const deleteBookController = async (req, res) => {
  try {
    // getting book id from url
    const { id } = req.params;

    //checking whether bookid exists
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Book ID not found",
      });
    }
    //check whether book exists with id
    const existBook = await bookModel.findById({ _id: id });
    if (!existBook) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    //delete book by id if it exists in db
    await bookModel.findByIdAndDelete({ _id: id });

    //sucess response after book has been deleted
    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting a book by book id API",
      error,
    });
  }
};

const getGenresController = async (req, res) => {
  try {
    // Use the find method to fetch all books
    const books = await bookModel.find({ user: req.body.id });
    // Extract genre names from the books
    const genres = books.map((book) => book.genre);

    // Use Set to get unique genre names
    const uniqueGenres = [...new Set(genres)];
    res.status(200).send({
      success: true,
      uniqueGenres,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching genres",
      error,
    });
  }
};
const getAuthorsController = async (req, res) => {
  try {
    const books = await bookModel.find({ user: req.body.id });

    const authors = books.map((book) => book.author);

    const uniqueAuthors = [...new Set(authors)];
    res.status(200).send({
      success: true,
      uniqueAuthors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching authors",
      error,
    });
  }
};

const getTitlesController = async (req, res) => {
  try {
    const books = await bookModel.find({ user: req.body.id });

    const titles = books.map((book) => book.title);

    const uniqueTitles = [...new Set(titles)];
    res.status(200).send({
      success: true,
      uniqueTitles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching titles",
      error,
    });
  }
};

module.exports = {
  getAllBooksController,
  getBookByIDController,
  createBookController,
  updateBookController,
  deleteBookController,
  getGenresController,
  getAuthorsController,
  getTitlesController,
  getAllBooksByUserIDController,
};
