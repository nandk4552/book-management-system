import { Avatar, Modal, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserAvatar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/get-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(data.user);
    } catch (error) {
      message.error("Failed to fetch user details");
      console.error(error);
    }
  };

  const handleAvatarClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Avatar
        className="me-1"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
          width: "50px",
          height: "50px",
        }}
        src={userData?.profile}
        onClick={handleAvatarClick}
      />
      <Modal
        title="User Profile"
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        {userData && (
          <div>
            <p>
              <strong>Name:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>User Type:</strong> {userData.usertype}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserAvatar;
