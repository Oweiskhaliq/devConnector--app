import express from "express";
import postRouter from "./routes/Api/posts.js";
import userRouter from "./routes/Api/user.js";
import profileRouter from "./routes/Api/profile.js";
import mongoose from "mongoose";

const app = express();

//DB config
import { db } from "./config/keys.js";

//Connect To Mongo
mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to DB ", error);
  });

//meddlewares
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
});
