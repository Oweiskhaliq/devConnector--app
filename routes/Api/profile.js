import { Router } from "express";
import passport from "passport";
import profileModel from "../../models/profile.js";
const profileRouter = Router();

// load profile validation
import validateProfileInput from "../../validation/profile.js";

// @route  Get /api/profile/test
// @desc  to test the route
// @access public
profileRouter.get("/test", (req, res) => {
  res.json({
    message: "Profile works",
  });
});
// @route  Get /api/profile
// @desc get current user profile
// @access public
profileRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    profileModel
      .findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route  POST /api/profile
// @desc POST Create and Edit user profile
// @access public
profileRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //destructure the validation object
    const { errors, isValid } = validateProfileInput(req.body);
    // check for error
    if (!isValid) {
      //send response
      res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //skills is an array split it by comma
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // social is an object
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.ylinkedin = req.body.ylinkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profileModel.findOne({ user: req.user.id }).then((profile) => {
      //update case
      if (profile) {
        profileModel
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then((profile) => res.json(profile));
      } else {
        // create case
        //check if handle exist
        profileModel
          .findOne({ handle: profileFields.handle })
          .then((profile) => {
            if (profile) {
              res.status(400).json("that handle already exist.");
            }
            //save profile
            new profileModel(profileFields)
              .save()
              .then((profile) => res.json(profile));
          });
      }
    });
  }
);

export default profileRouter;
