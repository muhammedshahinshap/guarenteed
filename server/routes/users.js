const express = require("express");
const router = express.Router();
const userCntr = require("../controllers/userCntr");
const isAuth = require("../middlewares/isAuth");
const fileSizeHandler = require("../middlewares/fileSizeHandler");
const upload = require("../utils/fileUpload");
const uploadCV = require("../utils/cvUpload");

router.route("/register").post(userCntr.userCntr);
router.route("/login").post(userCntr.loginCntr);
router.route("/google-login").post(userCntr.getUserdata);
router
  .route("/user-profile")
  .post(
    isAuth,
    upload.single("profilePicture"),
    fileSizeHandler,
    userCntr.userProfile
  );
router
  .route("/company-profile")
  .post(isAuth, upload.single("profilePicture"), userCntr.companyProfile);
router.route("/user-data").get(isAuth, userCntr.getUserprofile);
router
  .route("/sent-mail")
  .post(isAuth, uploadCV.single("file"), userCntr.sentMail);
router.route("/add-to-wishlist/:id").get(isAuth, userCntr.addToWishlist);
router.route("/get-wishlist-data").get(isAuth, userCntr.wishListData);
router.route("/get-premium").get(isAuth, userCntr.getPremium);
router
  .route("/get-job-applications/:id")
  .get(isAuth, userCntr.getJobappications);
router
  .route("/cancel-job-applications/:id")
  .get(isAuth, userCntr.cancelApplication);
router.route("/verify/:id").get(userCntr.verifyUser);
router.route("/sent-otp").post(userCntr.sendOTP);
router.route("/get-timing").get(userCntr.getOTPTime);
router.route("/validate-otp").post(userCntr.validateOTP);
router.route("/get-mail").get(userCntr.getMail);
router.route("/clear-all").get(userCntr.clearAll);
router.route("/reset-password").post(userCntr.resetPassword);
router.route("/clear-time-out").get(userCntr.clearTimeouts);

module.exports = router;
