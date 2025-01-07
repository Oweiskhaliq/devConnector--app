import { Router } from "express";

const profileRouter = Router();

// @route  Get /api/profile/test
// @desc  to test the route
// @access public
profileRouter.get("/test", (req, res) => {
  res.json({
    message: "Profile works",
  });
});

export default profileRouter;
