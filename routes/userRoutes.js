const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// all Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post('/resendVerifyEmailToken', authController.resendVerifyEmailToken)

//email verification api
router.post("/verifyEmail", authController.varifyEmail);

//add google and facebook login api's here and their functions in authController.js file
router.post('/loginWithGoogle', authController.loginWithGoogle)
router.post('/loginWithFacebook', authController.loginWithFacebook)


//other routes
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

//autologin or check
router.post("/checkLogin", authController.protect, authController.checkLogin);

router.post("/updateMyPassword", authController.protect, authController.updatePassword);

router.post("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.post('/addUserMood', authController.protect, userController.addUserMood);
router.get('/getUserMood', authController.protect, userController.getUserMood);

router.get('/getSubscriptionInfo',  authController.protect, userController.getusersubinfo);
router.post('/setSubscriptionInfo',  authController.protect, userController.setusersubinfo);


module.exports = router;
