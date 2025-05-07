const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const { route } = require("./listings.js");
const Listing = require("../models/listing.js");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");



// review
// post 
router.post("/",isLoggedIn,reviewController.create);
 
 //delet route
 router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(reviewController.delete));


 module.exports=router;