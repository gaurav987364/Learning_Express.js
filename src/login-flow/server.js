//! Learning databases (Mongo Db & Mongoose)...
import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
//import db
import connection from "../database/connect.js";
import User from "../schemas/user.js";

//import mongo store for sessions storage
import MongoStore from "connect-mongo";

//hash function
import bcryptjs from "bcryptjs";
// import strategy file
import "../strategies/local2.js";
import mongoose from "mongoose";

const port = process.env.PORT || 4000;

configDotenv();
const app = express();

//connect to db
connection();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SESSION_SECRET",
    resave: false, //update the time of cookie on every request and resave it
    saveUninitialized: false, // for now
    cookie: {
      maxAge: 3600000 * 24 * 30, // 30 days
      httpOnly: true,
      secure: false, // set to true for https
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      autoRemove: "every Day",
      // remove expired sessions every day
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/users", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required");
  }

  //hasing the pasowrd
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  // create a new user
  const newUser = new User({ username, password: hashedPassword, email });
  // save the user
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send("Server error");
  }
});

//login
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  console.log(req.session);
  if (req.user) {
    res.send({
      message: "Logged in successfully",
      user: req.user,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
