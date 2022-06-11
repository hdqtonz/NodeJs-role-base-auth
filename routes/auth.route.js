const express = require("express");
const { userRegister, userLogin } = require("../controller/auth.controller");
const router = express.Router();

// user register route
router.post("/register", userRegister);

// user login route
router.post("/login", userLogin);

module.exports = router;
