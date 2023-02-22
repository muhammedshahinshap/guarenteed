const express = require("express");
const router = express.Router();
const adminCntr = require("../controllers/adminCntr");
const isAuth = require("../middlewares/isAuth");
router.route("/get-admin-user").get(isAuth, adminCntr.Users);
router.route("/get-admin-reported-user").get(isAuth, adminCntr.ReportedUsers);
router.route("/get-admin-company").get(isAuth, adminCntr.Companies);
router
  .route("/get-admin-reported-company")
  .get(isAuth, adminCntr.ReportedCompanies);
router.route("/report-user/:id").get(isAuth, adminCntr.reportUser);
router.route("/get-admin-premium-user").get(isAuth, adminCntr.PremiumUsers);
router
  .route("/get-admin-premium-companies")
  .get(isAuth, adminCntr.PremiumCompanies);
router.route("/get-admin-active-jobs").get(isAuth, adminCntr.activeJobs);
router.route("/get-admin-reported-jobs").get(isAuth, adminCntr.reportedJobs);
router.route("/get-admin-expired-jobs").get(isAuth, adminCntr.expiredJobs);
router.route("/report-job/:id").get(isAuth, adminCntr.reportJob);
router.route("/activate-user/:id").get(isAuth, adminCntr.activateUser);
router.route("/get-payment-data").get(isAuth, adminCntr.getPaymentData);
router.route("/get-yearwise-data").get(isAuth, adminCntr.yearWisedata);
router.route("/get-no-of-premiums").get(isAuth, adminCntr.PremiumOrNot);



module.exports = router;
