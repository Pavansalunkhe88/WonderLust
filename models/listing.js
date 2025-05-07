const mongoose = require("mongoose");
const review = require("./review");
const { string } = require("joi");
const { listingSchema } = require("../schema");
const Review =require("./review.js");

const Schema = mongoose.Schema;

const Listingschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
 
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});


// listingSchema.post("findOneAndDelete",async(listing )=>{
//    await Review.deleteMany({reviews :{$in :listing.reviews}});
// })

const Listing = new mongoose.model("Listing", Listingschema);

module.exports = Listing;