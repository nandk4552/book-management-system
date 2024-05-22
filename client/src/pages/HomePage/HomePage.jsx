import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BookList from "../../components/BookList/BookList.jsx";
import "./HomePage.css";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout.jsx";
const HomePage = () => {
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  // const [selectedCatgory, setSelectedCatgory] = useState("drinks");
  // const categories = [
  //   {
  //     name: "drinks",
  //     imageUrl:
  //       "https://assets.bonappetit.com/photos/61191afbd8418d03d607a3ed/1:1/w_1129,h_1129,c_limit/Blue%20Drink-Silver%20Factory-01.jpg",
  //   },
  //   {
  //     name: "rice",
  //     imageUrl:
  //       "https://static.vecteezy.com/system/resources/previews/028/144/564/original/rice-in-a-bowl-cartoon-illustration-rice-food-flat-icon-outline-vector.jpg",
  //   },
  //   {
  //     name: "noodles",
  //     imageUrl:
  //       "https://i.pinimg.com/736x/63/a8/b5/63a8b5b0bde089a07e0686eb7b5327bf.jpg",
  //   },
  // ];
  const getAllBooks = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/books/`
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setBooksData(data.books);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);
  return (
    <DefaultLayout>
      {/* <div className="d-flex align-items-center justify-content-center ">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCatgory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCatgory(category.name)}
          >
            <h4 className="me-2">{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              style={{
                objectFit: "cover",
                borderRadius: 10,
                mixBlendMode: "multiply",
                height: "30px",
                width: "30px",
              }}
            />
          </div>
        ))}
      </div> */}
      <Row>
        {booksData
          // .filter((i) => i.category === selectedCatgory)
          .map((book, index) => (
            <Col
              className="d-flex align-items-center  justify-content-center my-3"
              key={index}
              xs={24}
              lg={6}
              md={12}
              sm={12}
            >
              <BookList key={book?.id} book={book} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
