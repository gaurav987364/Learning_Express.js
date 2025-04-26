import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the views directory explicitly
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Define a route
app.get("/", (req, res) => {
  const data = {
    name: "Gaurav",
    hobbies: ["Coding", "Gaming", "Cycling"],
  };
  res.render("index", data);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
