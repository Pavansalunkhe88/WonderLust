const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const { route } = require("./listings.js");
const Listing = require("../models/listing.js");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");



// review
// post 
router.post("/",isLoggedIn,async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review Created..!");
    res.redirect(`/listings/${listing._id}`);
   
 })
 
 //delet route
 router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params;
 
  await Listing.findByIdAndUpdate(id,{ $pull :{review :reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted..!");
  res.redirect(`/listings/${id}`);
 
 }));


 module.exports=router;