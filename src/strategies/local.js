//file name local means our strategy is of type local ok
import passport from "passport";
import { Strategy } from "passport-local"; //this is Class constructor

export const mockUser = [
  { id: 1, username: "Don", password: "xyz123", email: "don@example.com" },
  { id: 2, username: "Jane", password: "abc456", email: "jane@example.com" },
  { id: 3, username: "Alice", password: "pqr789", email: "alice@example.com" },
];

//! on sending port requests sabse phle chalgea last wana code and uske liye chalega serialize user function and then agar hme dubara click krte hai to chlega deserialize user function
//for that error : - Failed to serialize user into session
//?this function just store the user data into session
passport.serializeUser((user, done) => {
  console.log("serialize user log");
  console.log(user);
  done(null, user.id);
});

//for that error : - Failed to deserialize user from session

passport.deserializeUser((id, done) => {
  console.log("De-serialize user log");
  console.log(id);
  try {
    const findUser = mockUser.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  //? idhr is strategy me callback se phle ek option ka option ata hai jisme ham specify krte hai kuch chije like abhi to hm simple username me name le re hai but ye generally emial hota hai to hme us option me { usernamefield: "emial"}, batana pdta hai ok
  new Strategy((username, password, done) => {
    try {
      const findUser = mockUser.find((user) => user.username === username);

      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Incorrect password");

      //if user finds
      done(null, findUser); // send the user if no error aya
    } catch (error) {
      done(error, null); // hame idhr error or field jo nhi mili usko dena hota hai like null for user
    }
  })
); // we have two things in the use one is options and other is callback
