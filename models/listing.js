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
    type: String,
    default:
      "https://www.istockphoto.com/photo/girls-bedroom-gm916076968-252087031?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Froom&utm_medium=affiliate&utm_source=unsplash&utm_term=room%3A%3A%3A",
    set: (v) =>
      v === ""
        ? "https://www.istockphoto.com/photo/girls-bedroom-gm916076968-252087031?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Froom&utm_medium=affiliate&utm_source=unsplash&utm_term=room%3A%3A%3A"
        : v,
  },
  price: Number,
  location: String,
  country: String,
 
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ]
});


// listingSchema.post("findOneAndDelete",async(listing )=>{
//    await Review.deleteMany({reviews :{$in :listing.reviews}});
// })

const Listing = new mongoose.model("Listing", Listingschema);

module.exports = Listing;