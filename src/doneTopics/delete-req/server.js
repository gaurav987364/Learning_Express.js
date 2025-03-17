import express from "express";
import { configDotenv } from "dotenv";

// Load environment variables from .env file

configDotenv();

const app = express();
//middleware json so data can be log into console;
app.use(express.json());
const port = process.env.PORT || 4000;

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "okok@gmail.com" },
  { id: 2, name: "Bob Brown", email: "bob@gmail.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@gmail.com" },
];

app.get("/api/users", (req, res) => {
  res.status(200).send(mockUsers);
});

//?DELETE request
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (isNaN(userId)) {
    res.status(400).send("User not found with id");
  }

  if (userIndex === -1) {
    res.status(400).send("User not found.");
  }
  //delete user from array
  mockUsers.splice(userIndex, 1);
  return res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
