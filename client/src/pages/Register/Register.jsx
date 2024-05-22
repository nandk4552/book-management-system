import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/auth/register`,
        values
      );
      message.success("user registered successfully!");
      dispatch({
        type: "rootReducer/hideLoading",
      });
      navigate("/login");
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
      <div className="register">
        <div className="register-form">
          <h3>Register with BookFlow</h3>
          <hr className="bg-secondary  p-0 " />
          <Form layout="vertical" autoComplete="on" onFinish={handleSubmit}>
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input Username!",
                },
              ]}
            >
              <Input placeholder="Enter your user name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email ID!",
                },
              ]}
            >
              <Input placeholder="Enter your Email" />
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
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input Mobile Number!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter your mobile number" />
            </Form.Item>
            <Form.Item
              label="answer"
              name="answer"
              rules={[
                {
                  required: true,
                  message: "Please input answer!",
                },
              ]}
            >
              <Input placeholder="Enter your answer" />
            </Form.Item>

            <div className="d-flex align-items-center justify-content-between ">
              <p className="m-0 p-0">
                Already Register ? Please{" "}
                <Link to={"/login"} className="fw-bolder">
                  Login Here !
                </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
