//? this file is for database like for original one ;

import passport from "passport";
import { Strategy } from "passport-local";
import User from "../schemas/user.js";
//bcrypt for compare password
import bcrypt from "bcryptjs";

passport.serializeUser((user, done) => {
  console.log("serialize user log");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("De-serialize user log");
  console.log(id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });

      if (!findUser) throw new Error("User not found");
      //compare password
      const match = await bcrypt.compare(password, findUser.password);
      if (!match) throw new Error("Incorrect password");

      //if user finds
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
