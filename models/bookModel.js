const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book title is required"],
  },
  author: {
    type: String,
    required: [true, "book author name is required"],
  },
  genre: {
    type: String,
    required: [true, "book genre is required"],
  },
  yearPublished: {
    type: Number,
    required: [true, "book published year is required"],
  },
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sLZifBMeDR6ftxIUzgqWxoeAfJnwl5GeZw&s",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Book", bookSchema);
