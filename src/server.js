import express from "express";
import { configDotenv } from "dotenv";
//import routes
import userRoute from "./routes/userRoute.js";

// Load environment variables from.env file

configDotenv();

const port = process.env.PORT || 4000;

const mockUsers = [{ id: 1, name: "Alice Johnson", email: "okok@gmail.com" }];

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

//?Router middleware;
//setting up routes middleware;
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
