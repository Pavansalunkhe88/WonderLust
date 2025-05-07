const Listing = require("../models/listing.js");

//Index
module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}

//new
module.exports.new=async (req, res) => {
    res.render("listings/new.ejs")
}

//show
module.exports.show=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

//create
module.exports.create=async (req, res, next) => {
    let url =req.file.path;
    let filename=req.file.filename;

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success", "New Listing Created..!");
    res.redirect("/listings");
}

//edit
module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    
    let originalImageUrl= listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250")

    res.render("listings/edit.ejs", { listing ,originalImageUrl})
}

//update
module.exports.update=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
 
    if(typeof req.file !=="undefined"){
    let url =req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

//delete
module.exports.delete=async (req, res) => {
    let { id } = req.params;
    let deletelistings = await Listing.findByIdAndDelete(id);
    console.log(deletelistings);
    req.flash("success", " Listing Deleted..!");
    res.redirect("/listings");
}