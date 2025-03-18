import express from "express";
import { configDotenv } from "dotenv";
//import routes
import userRoute from "./routes/userRoute.js";

//setting up cookie-parser middleware
import cookieParser from "cookie-parser";

// Load environment variables from.env file

configDotenv();

const port = process.env.PORT || 4000;

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

// Middleware to parse cookies

app.use(cookieParser());

//?Router middleware;✅

//setting up routes middleware;
// app.use("/api/users", userRoute);

//setting up products route with cookies;
app.use("/api/products", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
