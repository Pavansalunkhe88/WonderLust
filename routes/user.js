const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// signup
router.route(".signup")
    .get(userController.rendersignup)
    .post(wrapAsync(userController.signup));

// login route
router.route("/login")
    .get(userController.renderlogin)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }), userController.login);

// logout route
router.get("/logout",userController.logout );

module.exports = router;