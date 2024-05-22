const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//get alll users from db
const getALLUserController = async (req, res) => {
  try {
    // find user
    const users = await userModel.find({});

    //validation
    if (!users) {
      return res.status(404).send({
        success: false,
        message: "Users not found",
      });
    }

    //hide password
    users.password = undefined;
    //success response
    res.status(200).send({
      success: true,
      message: "Users Get Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all users API",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //hide password
    user.password = undefined;
    //success response
    res.status(200).send({
      success: true,
      message: "User Get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

//update user controller
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //update user
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user
    await user.save();

    //success response
    return res.status(200).send({
      success: true,
      message: "User Update Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

//reset user password controller
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //updating user password with new encrypted password
    user.password = hashedPassword;

    //save the updated password user
    await user.save();

    //success response
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error,
    });
  }
};

// update password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide a old and new password",
      });
    }

    //check password || compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update encrypted password
    user.password = hashedPassword;

    //save the updated password user
    await user.save();
    //success response
    return res.status(200).send({
      success: true,
      message: "Password Update Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update password API",
      error,
    });
  }
};

// delete user from the database
const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "id not found",
      });
    }
    //find user and delete
    await userModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete user API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  getALLUserController,
};
