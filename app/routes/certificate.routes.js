module.exports = (app) => {
  const authJwt = require("../middlewares/auth.jwt");
  const express = require("express");
  const certificate_controller = require("../controllers/certificate.controller");
  const router = express.Router();
  router.get(
    "/user/:user_id",
    certificate_controller.getCertificatesForUser
  );
  router.post("/create", certificate_controller.createCertificate);

  router.delete(
    "/:certificate_id",
    certificate_controller.deleteCertificate
  );
  router.put(
    "/:certificate_id",
    certificate_controller.updateCertificate
  );
  app.use("/api/certificate", router);
};
