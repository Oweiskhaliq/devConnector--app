import express from "express";
import postRouter from "./routes/Api/posts.js";
import userRouter from "./routes/Api/user.js";
import profileRouter from "./routes/Api/profile.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ConnectDB from "./config/ConnectDB.js";
dotenv.config();
import passport from "passport";

const app = express();

// body parser meddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//meddlewares
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

const PORT = process.env.PORT || 5000;

ConnectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
  });
});
