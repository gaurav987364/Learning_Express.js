import express from "express";
import { configDotenv } from "dotenv";
const port = process.env.PORT || 4000;

//things from validator package
import { query, body, validationResult, matchedData } from "express-validator";

// Load environment variables from .env file
configDotenv();

//making app
const app = express();

//Middleware for query parameters
// app.use(query("filter", "Name must be provided").notEmpty());
// app.use(query("value", "Age must be a number").isNumeric());
//validate user
// app.use(body("username", "Username is required").isLength({min:3,max:20}).withMessage("Name must within 3-20 characters."));
// app.use(body("email", "Email is required").isEmail())
//setup json middleware
app.use(express.json());

//?Validations in express/js

//get req;
app.get("/api/users", (req, res) => {
  const results = validationResult(req);
  console.log(results);
  res.status(200).send("Welcome to hood...");
});

//post req;
app.post(
  "/api/users",
  [
    body("username", "Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must within 3-20 characters."),
    body("email", "Email is required").isEmail(),
    // body("email", "Email must be unique").custom((value) => {
    //   return User.findOne({ email: value }).then((user) => {
    //     if (user) {
    //       return Promise.reject("Email already exists");
    //     }
    //   });
    // }),
  ],
  (req, res) => { 
    const { username, email } = req.body;
    //enable this feature otherwise you wont track errors
    const results = validationResult(req);
    console.log(results); // print in console
    //check if errors exist 
    if(!results.isEmpty()){
        return res.status(400).json({ errors: results.array() });
    };

    if (!username || !email) {
      return res.status(400).send("Username and email are required");
    }

    //data after validation
    const userData = matchedData(req);
    console.log(userData); // print in console
    res.status(201).send({
      message: "User created successfully",
      userData,
    });
  }
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
