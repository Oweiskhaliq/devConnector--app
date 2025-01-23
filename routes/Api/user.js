import { Router } from "express";
import userModel from "../../models/Users.js";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
// load register validation
import validateRegisterInput from "../../validation/register.js";
// load Login validation
import validateLoginInput from "../../validation/login.js";

const userRouter = Router();

// @route  Get /api/user/register
// @desc  create a register route
// @access public

userRouter.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //check email if exist or not in DB
  //destructring the field for request body.

  const { name, email, password } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json({ errors });
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
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //destructing the field
  const { email, password } = req.body;

  // check for user
  userModel.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found.";
      res.status(404).json({ errors });
    }

    //check for password
    bcryptjs.compare(password, user.password).then((isMuch) => {
      if (isMuch) {
        //user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //Sign Token
        //takes three argument payload key and objec (expiry Time)
        jwt.sign(
          payload,
          process.env.JWTSECRETE_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password is Incurrect";
        return res.status(404).json({ errors });
      }
    });
  });
});

// @route  Post /api/user/current
// @desc  returning the current user
// @access private
userRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }), // Authenticate with JWT
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    }); // Send success response with user data
  }
);
export default userRouter;
