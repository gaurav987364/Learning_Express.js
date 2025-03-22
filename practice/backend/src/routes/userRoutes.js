import { Router } from "express";
import User from "../schemas/userSchema.js";

const router = Router();

// Routes

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to our Todo API!",
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404).send({
      message: "All the fields are required.",
    });
  }

  //create a new user
  const newUser = new User({ name, email, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({
      message: "Server error while creating user.",
      error,
    });
  }
});

// router.post("/auth", loginUser);

router.get("/todos", (req, res) => {});

router.put("/todos/:id", (req, res) => {});

router.delete("/todos/:id", (req, res) => {});

export default router;
