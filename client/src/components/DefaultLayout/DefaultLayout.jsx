import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../../redux/rootReducer";
import Spinner from "../Spinner/Spinner";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./DefaultLayout.css";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, darkMode } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical ">
          <img
            src="https://ik.imagekit.io/fhe9c5aen/download%20(1)_86TTaGDu0V.png?updatedAt=1716375754345"
            alt="BookFlow"
            width={!collapsed ? `100` : `60`}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/books" icon={<UnorderedListOutlined />}>
            <Link to={"/books"}>Books</Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to={"/users"}>Users</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className={darkMode ? "dark" : "light"}
        >
          <Button
            type="text"
            className={darkMode ? "dark" : "light"}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex">
            <UserAvatar />
            <div
              className="cart-item d-flex justify-content-between  flex-row"
              onClick={handleThemeToggle}
            >
              {darkMode ? <SunOutlined /> : <MoonOutlined />}
            </div>
          </div>
        </Header>
        <Content
          className={darkMode ? "dark" : "light"}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
