import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHanlder from "express-async-handler";
import { UserModel } from "../models/userModel.js";

// @dec register user
// @route POST /api/auth/register
// @access public
const register = asyncHanlder(async (req, res) => {
  const { email, username, password } = req.body;
  if (email && username && password) {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      res.status(400);
      console.log("Not Found");
      throw new Error("User Is Already Exist");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).send({ _id: newUser._id, email: newUser.email });
    } else {
      res.status(400);
      throw new Error("User Inputs Are Invalid");
    }
  } else {
    res.status(400);
    throw new Error("User Inputs Are Invalid ,Please Enter Valid Inputs");
  }
});

//@dec log in user
//@route /api/auth/login
//@access private
const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await UserModel.findOne({ email });
    if (user) {
      //compare password with hashed password
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res.status(200).send({ token: accessToken, id: user._id });
      } else {
        res.status(400);
        throw new Error("InCorrect Password");
      }
    } else {
      res.status(401);
      throw new Error("User Is Unathorized");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

//@dec get current
//@route /api/auth/current-user
//@access private
const getCurrentUser = asyncHanlder(async (req, res) => {
  res.status(200).send(req.user);
});

export { register, loginUser, getCurrentUser };
