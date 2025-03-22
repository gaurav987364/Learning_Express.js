import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database/db.js";
const port = process.env.PORT || 4000;

// Load environment variables from .env file
configDotenv();
const app = express();
app.use(cookieParser());
app.use(express.json());

//db
connectDB();

app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
