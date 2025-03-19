//! Learning passport.js and authentication using that package.
import express from "express";
import { configDotenv } from "dotenv";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
// import strategy file
import "./strategies/local.js";

const port = process.env.PORT || 4000;

configDotenv();
const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "hshshshhhdhddh",
    resave: false,
    saveUninitialized: false, //for now
    cookie: {
      maxAge: 60000000,
    },
  })
);
app.use(cookieParser());

app.use(passport.initialize()); // initialize
app.use(passport.session());

//setting up end points for routes for login;

//list of strategies [local, google,discord, facebook, twitter,github etc]
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

//endpoint for status like user is login or not

app.get("/api/auth/status", (req, res) => {
  console.log(req.session);
  if (req.user) return res.send(req.user);
  res.sendStatus(401);
});

//endpoint for logout

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401); // means unauthorized
  }
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    console.log("user logged out");
    res.clearCookie("connect.sid"); // destroy session cookie
    res.sendStatus(200); // means logged out successfully
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
