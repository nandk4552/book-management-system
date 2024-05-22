import { Card } from "antd";
import { useSelector } from "react-redux";
import Book from "../Book/Book";
import "./BookList.css";

const BookList = ({ book }) => {
  const { loading } = useSelector((state) => state.rootReducer);

  return (
    <div>
      <Card
        loading={loading}
        hoverable={true}
        style={{
          width: 240,
          margin: "1rem !important",
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          // marginTop: 16,
        }}
        cover={
          <img
            alt={book?.title + "image"}
            src={book?.image}
            style={{
              height: 220,
              width: "100%",
              objectFit: "cover",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            }}
          />
        }
      >
        <Book book={book} />
      </Card>
    </div>
  );
};

export default BookList;
