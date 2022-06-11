const express = require("express");
const auth = require("../middleware/auth");
const {
  // createNewUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  profile,
} = require("../controller/users.controller");
const router = express.Router();

// Get all User
router.get("/users", auth, getAllUser);

// profile Route
router.get("/profile", auth, profile);

// Get single user
router.get("/users/:id", auth, getSingleUser);

// udpate a user
router.patch("/users/:id", auth, updateUser);

// delete a user
router.delete("/users/:id", auth, deleteUser);

module.exports = router;
