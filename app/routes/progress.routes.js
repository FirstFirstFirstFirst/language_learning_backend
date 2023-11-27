module.exports = (app) => {
  const express = require("express");
  const progress_controller = require("../controllers/progress.controller");
  const authJwt = require("../middlewares/auth.jwt");
  console.log("progress ");
  const router = express.Router();
  router.post("/create", authJwt, progress_controller.createProgress);
  router.get(
    "/:userId/:courseId",
    progress_controller.getCourseProgress
  );
  router.post("/update", authJwt, progress_controller.updateProgress);
  app.use("/api/progress", router);
};
