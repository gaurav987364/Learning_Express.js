import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb://localhost/express_learning", {
      dbName: "learning_express",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

export default connection;
