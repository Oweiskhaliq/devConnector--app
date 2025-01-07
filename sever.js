import express from "express";
import postRouter from "./routes/Api/posts.js";
import userRouter from "./routes/Api/user.js";
import profileRouter from "./routes/Api/profile.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// body parser meddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//DB config

//Connect To Mongo
mongoose
  .connect(process.env.MONGODB_URI)
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
