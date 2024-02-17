const express = require("express");
const {
  createIdControllers,
  loginIdControllers,
} = require("../../../controllers/userControllers");
const userHead = require("../../../middileware/user/userHeadCheck");
const _ = express.Router();

_.post("/create", userHead, createIdControllers);
_.post("/login", userHead, loginIdControllers);

module.exports = _;
