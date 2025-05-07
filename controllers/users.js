const User = require("../models/user.js");

module.exports.rendersignup =(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup=async(req, res) => {
    try {
        let {username, email, password} = req.body;
        let newUser = new User({
            email: email,
            username: username
        });
        
        const registerdUser = await User.register(newUser, password);
        
        // after signup, login the user automatically
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to the wonderlust!");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderlogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to the wonderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
}
