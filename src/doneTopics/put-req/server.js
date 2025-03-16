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

//?PUT request
app.put("/api/users/:id", (req, res) => {
  console.log(req.body); // get data from client request;

  const { id, name, email } = req.body;
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    res.status(400).send("Invalid user id.");
  }

  //find user indx
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).send("User not found.");
  }

  //before update we have to add check that all property exits
  if (!id || !name || !email) {
    res.status(400).send("All properties are required.");
  }
  mockUsers[userIndex] = {
    id: userId,
    name: name,
    email: email,
  };
  // we have to send status 201 (creation code) so that data is added to db;
  return res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
