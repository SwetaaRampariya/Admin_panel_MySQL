const express = require('express');
const router = express.Router();
 const jwt = require('jsonwebtoken');
const authController = require('../controller/authController');
const upload = require('../Middleware/multer');
const { authenticate, generateToken } = require('../Middleware/auth');


router.post("/loginUser", generateToken, authController.login);

router.post("/signup", upload.single('Image'), authController.registration);

router.post("/verifyEmail", authController.verifyEmail);

router.post("/verifyOtp", authController.verifyOtp);

router.post("/updatePassword", authController.updatePassword);

router.post("/resetpass",authController.updatePassword);

router.post("/ejsUpdateProfile", authController.ejsUpdateProfile);


router.post("/updateProfile", authenticate, upload.single('Image'), authController.updateProfile);



// router.get("/category", authController)

router.get("/viewProfile", authenticate, authController.viewProfile);

router.get("/changePassword" , authController.changePassword);

router.get("/logout", authController.logout);



router.put("/forgetPassword", authenticate, authController.forgetPassword);


module.exports = router;