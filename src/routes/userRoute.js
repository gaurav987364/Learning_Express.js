import { Router } from "express";

const router = Router(); // router ko banaya;

//making routes;

// const createUser = (req, res) => {};
// /api/users/ this end slash is below down wala;
// router.route("/").post(createUser);

router.get("/", (req, res) => {
    res.send("Hello World!");
})

export default router;
