const express = require("express");
const router = express.Router();
const jobHireCntr = require("../controllers/jobHireCntr");
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/fileUpload");

router
  .route("/job-hire")
  .post(isAuth, upload.single("hireImage"), jobHireCntr.jobHireCntr);
router.route("/get-hire").get(isAuth, jobHireCntr.jobHireData);
router.route("/delete-hire/:id").get(isAuth, jobHireCntr.jobHireDelete);
router.route("/get-home-job").post(isAuth, jobHireCntr.getHomeJobs);
router.route("/get-job-data/:id").get(isAuth, jobHireCntr.getJobData);
router.route("/filter-users").post(isAuth, jobHireCntr.filterUsers);


module.exports = router;
