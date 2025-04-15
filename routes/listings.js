const express=require("express");
const router =express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");



const validatelisting = (req, res, next) => {

    let { error } = listingSchema.validate(req.body);

    if (result.error) {
        let errmesg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, error);
    } else {
        next();
    }
}



// index route

router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));

// New Route
router.get("/new", wrapAsync(async (req, res) => {
    res.render("listings/new.ejs")
}));

// show route

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

//create Route
router.post("/", validatelisting, wrapAsync(async (req, res, next) => {

    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");

}));

//edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}));


// update route
router.put("/:id", validatelisting, wrapAsync(async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletelistings = await Listing.findByIdAndDelete(id);
    console.log(deletelistings);
    res.redirect("/listings");
}));

module.exports=router;