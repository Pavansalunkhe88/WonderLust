const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validatelisting } = require("../middleware.js");
const { populate } = require("../models/review.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, upload.single("listing[image]"),validatelisting, wrapAsync(listingController.create));

// New Route      
router.get("/new", isLoggedIn, wrapAsync(listingController.new));


router.route("/:id")
      .get( wrapAsync(listingController.show))
      .put(isLoggedIn,isOwner,upload.single("listing[image]"), validatelisting, wrapAsync(listingController.update))
      .delete(isLoggedIn,isOwner, wrapAsync(listingController.delete));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.edit));


module.exports = router;