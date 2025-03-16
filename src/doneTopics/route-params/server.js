import express from "express";
import dotenv from "dotenv";
const port = process.env.PORT || 4000;
//load the env variables
dotenv.config();

const app = express();

//?Route params
//this is the route for all users
app.get("/api/users", (req, res) => {
  res.status(200).send([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice Doe" },
  ]);
});

//?Route params means we give response based on that params info like id name etc or whatever.
const allUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Alice Doe" },
];

app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id); // { id: "1"} string id
  const id = parseInt(req.params.id);

  //means we give response based on that params info like id name etc or whatever
  if (isNaN(id)) {
    return res.status(400).send("Invalid user ID");
  }
  const user = allUsers.find((user) => user.id === id);

  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
