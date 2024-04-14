const express = require("express");
const userRouter = express.Router();
const { signUp, signIn } = require("../controller/user");
const { authenticateToken } = require("../middleware/middleware");

// Routes for user sign-up and sign-in
userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

module.exports = { userRouter };