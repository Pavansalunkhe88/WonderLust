const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js");
const { error } = require("console");
const { required } = require("joi");
const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");


main()
    .then(() => {
        console.log("Connect to db");
    }).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WonderLust');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//middleware
app.set(" view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
    res.send("I am Rooot");
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


// while respons is not matching for all route then
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong..." } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
    //res.status(statusCode).send(message);
})

app.listen(8080, () => {
    console.log("Listing on on port 8080");
});

