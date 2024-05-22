import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import "./BookPage.css";

const BookPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { darkMode } = useSelector((state) => state.rootReducer);
  const [genreFilters, setGenreFilters] = useState([]);
  const [authorsFilters, setAuthorsFilters] = useState([]);
  const [titlesFilters, setTitlesFilters] = useState([]);

  const getAllBooks = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/books/get-by-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setItemsData(data.books);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };
  const getGenres = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/books/filter/genres`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        const filters = data.uniqueGenres.map((genre) => ({
          text: genre,
          value: genre,
        }));
        setGenreFilters(filters);
      }
    } catch (error) {
      message.error("Failed to fetch genres");
      console.log(error);
    }
  };

  const getAuthors = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/books/filter/authors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        const filters = data.uniqueAuthors.map((author) => ({
          text: author,
          value: author,
        }));
        setAuthorsFilters(filters);
      }
    } catch (error) {
      message.error("Failed to fetch authors");
      console.log(error);
    }
  };

  const getTitles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/books/filter/titles`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        const filters = data?.uniqueTitles?.map((title) => ({
          text: title,
          value: title,
        }));
        setTitlesFilters(filters);
      }
    } catch (error) {
      message.error("Failed to fetch titles");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
    getGenres();
    getAuthors();
    getTitles();
  }, []);

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "rootReducer/showLoading",
        });

        await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/books/`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Book added successfully!");
        setPopupModal(false);
        getAllBooks();
        dispatch({
          type: "rootReducer/hideLoading",
        });
      } catch (error) {
        dispatch({
          type: "rootReducer/hideLoading",
        });
        message.error("Something went wrong!");

        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "rootReducer/showLoading",
        });
        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/v1/books/${editItem._id}`,
          value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        message.success("Book updated successfully!");
        setPopupModal(false);
        getAllBooks();
        dispatch({
          type: "rootReducer/hideLoading",
        });
      } catch (error) {
        dispatch({
          type: "rootReducer/hideLoading",
        });
        message.error("Something went wrong!");

        console.log(error);
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/books/${record?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      message.success("Book Delete successfully!");
      setPopupModal(false);
      getAllBooks();
      dispatch({
        type: "rootReducer/hideLoading",
      });
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      message.error("Something went wrong!");
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: titlesFilters,
      onFilter: (value, record) => record.title === value,
      filterSearch: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      filters: authorsFilters,
      onFilter: (value, record) => record.author === value,
      filterSearch: true,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      filters: genreFilters,
      onFilter: (value, record) => record.genre === value,

      filterSearch: true,
    },
    {
      title: "Published",
      dataIndex: "yearPublished",
      key: "yearPublished",
      sorter: (a, b) => a.yearPublished - b.yearPublished,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={"60"} width={"60"}></img>
      ),
    },

    {
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <div>
          <EditFilled
            style={{
              cursor: "pointer",
              color: "green",
              fontSize: "20px",
              marginRight: "1.2rem",
            }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteFilled
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "20px",
            }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between ">
        <h1 className={darkMode ? "dark" : "light"}>Books</h1>
        <Button
          onClick={() => setPopupModal(true)}
          type="primary"
          icon={<FileAddFilled />}
          className="my-3"
        >
          Add Book
        </Button>
      </div>
      <Table dataSource={itemsData} columns={columns} bordered />
      {/* pop modal */}
      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Book" : "Add New Book"}`}
          open={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <Form
            initialValues={editItem}
            layout="vertical"
            autoComplete="on"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input author!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[
                {
                  required: true,
                  message: "Please input genre!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Year Published"
              name="yearPublished"
              rules={[
                {
                  required: true,
                  message: "Please input Year Published!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input image url!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="d-flex justify-content-end ">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BookPage;
