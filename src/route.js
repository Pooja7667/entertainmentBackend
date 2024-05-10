const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("./user.js");

router.post("/register", Register);

router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;
