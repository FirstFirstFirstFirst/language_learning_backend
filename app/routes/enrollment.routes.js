module.exports = (app) => {
  const express = require("express");
  const enrollment_controller = require("../controllers/enrollment.controller");
  const authJwt = require("../middlewares/auth.jwt");

  const router = express.Router();

  router.post("/", enrollment_controller.createEnrollment);
  router.get(
    "/getEnroll/:user_id",
    authJwt,
    enrollment_controller.getEnrollmentsForUser
  );
  router.get("/allEnroll", authJwt, enrollment_controller.getAllEnrollments);
  router.get(
    "/check/:user_id/:course_id",
    authJwt,
    enrollment_controller.checkEnrollmentStatus
  );

  router.delete("/:id", authJwt, enrollment_controller.deleteEnrollments);

  app.use("/api/enrollment", router);
};
