// Import necessary modules and middleware
import express from "express";
import passport from "passport";
const router = express.Router();
import { register, sendOtp } from "../controllers/register";
import { Login } from "../controllers/login";
import { validationsMiddleware } from '../validation/validation'
import { getUserInfo } from "../controllers/getdata";
import { resetpasswordemailesend } from "../controllers/resetpassword";
import { resetpassword } from "../controllers/resetpassword";
import { Protected } from "../controllers/protected";

// Route for accessing protected resources, requires authentication
router.post('/protected', passport.authenticate('jwt', { session: false }), Protected);

// Route for getting user data, requires authentication
router.post("/getdata", passport.authenticate('jwt', { session: false }), getUserInfo);

// Route for sending OTP for registration
router.post("/sendOtp", validationsMiddleware, sendOtp);

// Route for user registration
router.post("/register", validationsMiddleware, register);

// Route for user login
router.post("/login", validationsMiddleware, Login);

// Route for sending reset password email
router.post('/resetpasswordemailesend', validationsMiddleware, resetpasswordemailesend);

// Route for resetting password
router.post('/resetpassword', validationsMiddleware, resetpassword);

// Export the router
module.exports = router;
