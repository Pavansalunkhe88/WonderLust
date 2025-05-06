const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
//miiddleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // saves the current URL to redirect after login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to login first!");
        return res.redirect("/login");
    }
    next();
}

//middleware to check if the user is the owner of the listing
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id ,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not owner of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errmesg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmesg); // Use 400 (Bad Request), not 404
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {

    let { error } = reviewSchema.validate(req.body);

    if (result.error) {
        let errmesg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, error);
    } else {
        next();
    }
}