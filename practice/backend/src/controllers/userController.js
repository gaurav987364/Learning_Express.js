import User from "../schemas/userSchema.js";

const createUser = async (req, res, next) => {
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
  next();
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send({
      message: "email and password field are required.",
    });
  }
  //find user by email
  const user = await User.findOne({ email });
  if (user) {
    res.send(user);
  }
  //   next();
};

export { createUser, loginUser };
