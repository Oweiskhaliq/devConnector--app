import { Router } from "express";

const userRouter = Router();

// @route  Get /api/user/test
// @desc  to test the route
// @access public
userRouter.get("/test", (req, res) => {
  res.json({
    message: "User works",
  });
});

export default userRouter;
