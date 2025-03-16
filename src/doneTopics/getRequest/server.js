import express from "express";
import dotenv from "dotenv";
const port = process.env.PORT || 4000;

// Load environment variables from.env file
dotenv.config();

const app = express();

//?get request:
app.get("/", (req, res) => {
  res.send("Hello! Learning express.js today.");
});

app.get("/api/users", (req, res) => {
  res.status(200).send({
    name: "User",
    email: "user@example.com",
    // Add more properties as needed
  });
});

app.get("/api/products", (req, res) => {
  res.status(200).send([
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    // Add more products as needed
  ]);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
