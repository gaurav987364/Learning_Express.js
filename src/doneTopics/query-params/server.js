import express from "express";
import { configDotenv } from "dotenv";
const port = process.env.PORT || 4000;
// Load environment variables from .env file
configDotenv();

const app = express();

const mockUsers = [
  { id: 1, name: "John Doe", age: "20" },
  { id: 2, name: "Jane Smith", age: "24" },
  { id: 3, name: "Mark Johnson", age: "21" },
  { id: 4, name: "Alice Johnson", age: "15" },
  { id: 5, name: "Bob Johnson", age: "31" },
];

// app.get("/api/users", (req, res) => {
//   res.status(200).send({
//     message: "Hello World!",
//   });
// });

//http://localhost:4000/api/users?filter=age&value=20
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) {
    // if no filter and value is present then send all users;
    return res.status(200).send(mockUsers);
  }
  if (filter && value) {
    return res
      .status(200)
      .send(mockUsers.filter((user) => user[filter] === value));
  }
  return res.status(400).send({ message: "Invalid filter or value" });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
