const express = require("express");

const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  getALLUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//* GET USER || POST || api/v1/user/get-user
router.get("/get-user", authMiddleware, getUserController);
//* GET ALL USERS || POST || api/v1/user/all-users
router.get("/get-all-users", authMiddleware, getALLUserController);

//* UPDATE USER || POST || api/v1/user/update-user
router.put("/update-user", authMiddleware, updateUserController);

//* UPDATE PASSWORD || POST || api/v1/user/update-user
router.post("/update-password", authMiddleware, updatePasswordController);

//* RESET USER PASSWORD  || POST || api/v1/user/reset-password
router.post("/reset-password", authMiddleware, resetPasswordController);

//* DELETE USER  || POST || api/v1/user/delete-user
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

module.exports = router;
