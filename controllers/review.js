const Review = require('../models/review');
const Listing = require('../models/listing');

//post
module.exports.create=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review Created..!");
    res.redirect(`/listings/${listing._id}`);
   
 }

 //delete
 module.exports.delete=async(req,res)=>{
    let {id,reviewId}=req.params;
   
    await Listing.findByIdAndUpdate(id,{ $pull :{review :reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted..!");
    res.redirect(`/listings/${id}`);
   
   }
