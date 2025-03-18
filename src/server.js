import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
//?import session package
import session from "express-session";

configDotenv();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
//setup session middleware
//! Sessions :- (register before all routes middleware)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "hshshshhhdhddh",
    resave: false,
    saveUninitialized: false, //for now
    cookie: {
      maxAge: 6000000, //10 minutes
      // secure: process.env.NODE_ENV === "production", //?if true, the cookie will only be sent over HTTPS
    },
  })
);

app.get("/api/users", (req, res) => {
  console.log(req.session); //? access session data
  console.log(req.sessionID); // or sessin.id

  //store data in session
  req.session.visited = true; // before doing this step every time on every requst the new session is created which is wrong
  req.session.user = { name: "Gaurav", age: 25 };
  console.log(req.session.user);

  //sending cookie
  res.cookie("hi", "session ki hello", {
    expires: new Date(Date.now() + 600000), //10 minutes
    httpOnly: true,
  });
  res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
