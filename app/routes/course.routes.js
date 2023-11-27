module.exports = (app) => {
  const course_controller = require("../controllers/course.controller");
  const authJwt = require("../middlewares/auth.jwt");

  const router = require("express").Router();

  router.get("/", course_controller.getAllCourses);
  router.get("/:courseId", course_controller.getCourseById);
  router.post("/create", course_controller.createCourse);

  router.put("/:courseId", course_controller.updateCourse);

  app.use("/api/courses", router);
};
