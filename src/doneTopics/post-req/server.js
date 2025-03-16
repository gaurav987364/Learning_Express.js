import express from "express";
import { configDotenv } from "dotenv";

// Load environment variables from .env file

configDotenv();

const app = express();
//middleware json so data can be log into console;
app.use(express.json());
const port = process.env.PORT || 4000;

const mockUsers = [{ id: 1, name: "Alice Johnson", email: "okok@gmail.com" }];

app.get("/api/users", (req, res) => {
  res.status(200).send(mockUsers);
});

//?POST request
app.post("/api/users", (req, res) => {
  console.log(req.body); // get data from client request;

  const newUser = req.body;
  mockUsers.push(newUser);
  // we have to send status 201 (creation code) so that data is added to db;
  return res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
