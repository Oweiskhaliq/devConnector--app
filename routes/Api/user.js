import { Router } from "express";
import userModel from "../../models/Users.js";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = Router();

// @route  Get /api/user/test
// @desc  to test the route
// @access public
userRouter.get("/test", (req, res) => res.json({ message: "User works" }));

// @route  Get /api/user/register
// @desc  create a register route
// @access public
userRouter.post("/register", (req, res) => {
  //check email if exist or not in DB
  //destructring the field for request body.
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All field are required",
    });
  }
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //Rating
        d: "mm", //Deafault
      });

      //create user
      const newUser = new userModel({
        name: name,
        email: email,
        password: password,
        avatar,
      });
      //encrpt password and send response
      bcryptjs.genSalt(10, (err, slat) => {
        bcryptjs.hash(newUser.password, slat, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route  Post /api/user/login
// @desc  user login / Returing Token
// @access public
userRouter.post("/login", (req, res) => {
  //destructing the field
  const { email, password } = req.body;

  //check for empty
  if (!email || !password) {
    return res.status(400).json({
      msg: " Enter email and password.",
    });
  }
  // check for user
  userModel.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ email: "User not found." });
    }
    console.log(user.password);
    //check for password
    bcryptjs.compare(password, user.password).then((isMuch) => {
      if (isMuch) {
        //user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //Sign Token
        //takes three argument payload key and objec (expiry Time)
        console.log(payload, process.env.JWTSECRETE_KEY, {});
        jwt.sign(
          payload,
          process.env.JWTSECRETE_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        );
      } else {
        return res.status(404).json({ password: "Password is Incurrect" });
      }
    });
  });
});
export default userRouter;
