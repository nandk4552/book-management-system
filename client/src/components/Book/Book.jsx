import React from "react";

const Book = ({ book }) => {
  return (
    <div>
      <h5 className="fw-bold text-uppercase">{book?.title}</h5>
      <h6>Author: {book?.author}</h6>
      <h6>Genre: {book?.genre}</h6>
      <h6>Year Published: {book?.yearPublished}</h6>
    </div>
  );
};

export default Book;
