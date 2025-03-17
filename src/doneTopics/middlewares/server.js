import express from 'express';
import { configDotenv } from 'dotenv';
const port = process.env.PORT || 4000;

// Load environment variables from .env file
configDotenv();

//making app
const app = express();

//setup json middleware
app.use(express.json());

//?Middlewares in express/js
const myMiddlewareFunc = (req,res,next)=>{
    console.log("hi from middleware 1");
    next();
};

//or
// app.use(myMiddlewareFunc) agar hm isko sab methods ki request ke upar idgr lagate hai to ye sab par apply hoga or agar hm chatae hai ki nhi bhai get or post ko chod kr put or patch me ho to simple uske liye after 2 request function ke baad app.use(myMiddlewareFunc) likh dege

//get req;
app.get("/api/users",myMiddlewareFunc, (req,res)=>{
    res.status(200).send("Welcome to hood...")
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});