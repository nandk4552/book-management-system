import { Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import "./UsersPage.css";

const UsersPage = () => {
  const [booksData, setBooksData] = useState([]);
  const dispatch = useDispatch();
  const getAllBooks = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "rootReducer/hideLoading",
      });
      setBooksData(data.users);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Type",
      dataIndex: "usertype",
      key: "usertype",
      render: (usertype) => (
        <span>
          {
            <Tag color={usertype === "admin" ? "red" : "green"} key={usertype}>
              {usertype.toUpperCase()}
            </Tag>
          }
        </span>
      ),
    },
    {
      title: "profile",
      dataIndex: "profile",
      key: "profile",
      render: (profile, record) => (
        <img src={profile} alt={record.name} height={"60"} width={"60"}></img>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between ">
        <h1>User Details</h1>
      </div>
      <Table dataSource={booksData} columns={columns} bordered />
    </DefaultLayout>
  );
};

export default UsersPage;
