import { Router } from "express";

const postRouter = Router();

// @route  Get /api/posts/test
// @desc  to test the route
// @access public
postRouter.get("/test", (req, res) => {
  res.json({
    message: "post works",
  });
});

export default postRouter;
