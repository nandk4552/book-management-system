import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, Row, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BookList from "../../components/BookList/BookList.jsx";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout.jsx";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  // filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
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
      // Extract unique genres from books
      const uniqueGenres = [...new Set(data.books.map((book) => book.genre))];
      setGenres(uniqueGenres);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuClick = (e) => {
    if (e.key === "all") {
      setSelectedGenre(null); // Clear the genre filter
    } else {
      setSelectedGenre(e.key);
    }
  };

  const filteredBooks = booksData.filter((book) => {
    return (
      (selectedGenre ? book.genre === selectedGenre : true) &&
      (searchTerm
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
    );
  });

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All Genres</Menu.Item> {/* Clear filter item */}
      {genres.map((genre) => (
        <Menu.Item key={genre}>{genre}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <DefaultLayout>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <Input
          placeholder="Search by book title"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
          className="mx-3"
        />
        <Dropdown overlay={menu}>
          <Button>
            <Space>
              {selectedGenre || "Filter by Genre"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      {/* <Row>
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
      </Row> */}
      <Row>
        {filteredBooks?.map((book, index) => (
          <Col
            className="d-flex align-items-center justify-content-center my-3"
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
