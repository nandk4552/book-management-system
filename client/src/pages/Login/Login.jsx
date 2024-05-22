import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/auth/login`,
        values
      );
      message.success(data?.message);
      dispatch({
        type: "rootReducer/hideLoading",
      });

      localStorage.setItem("auth", JSON.stringify(data?.user));
      localStorage.setItem("token", data?.token);
      navigate("/");
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      message.error("Something went wrong!");
      console.log(error);
    }
  };
  // currently login user
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="login">
        <div className="login-form">
          <h3>Login into BookFlow</h3>
          <hr className="bg-secondary  p-0 " />
          <Form layout="vertical" autoComplete="on" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email ID!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex align-items-center justify-content-between ">
              <p className="m-0 p-0">
                Don't have an Account ? Please{" "}
                <Link to={"/register"} className="fw-bolder">
                  Register Here !
                </Link>
              </p>
              <Button type="primary" htmlType="submit">
                login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
