import { Router } from "express";

const router = Router(); // router ko banaya;

//making routes;

// const createUser = (req, res) => {};
// /api/users/ this end slash is below down wala;
// router.route("/").post(createUser);

// router.get("/", (req, res) => {
//   res.cookie("my-cookie", "6969", {
//     maxAge: 60000,
//     expires: new Date(Date.now() + 900000), // 15 minutes
//     httpOnly: true, // The cookie is only accessible via HTTP requests
//     secure: true, // The cookie should only be sent over secure connections (HTTPS)
//   });
//   res.send("Hello World!");
// });

router.get("/", (req, res) => {
  //?sending cookies to client when user visit routs
  res.cookie("socks", "10-peice", {
    maxAge: 60000,
    expires: new Date(Date.now() + 900000), // 15 minutes
    httpOnly: true, // The cookie is only accessible via HTTP requests
    secure: true, // The cookie should only be sent over secure connections (HTTPS)
  });

  //?getting response cookie from client with each request
  //! we log this below console to read cookies but get undefined or not-parsed cookie
  console.log(req.headers.cookie);

  //!after install cookie-parser and setup that as middleware in server.js file we log this console and get the actual parsed cookie;
  console.log(req.cookies);

  res.status(200).send([
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
  ]);
});

export default router;
