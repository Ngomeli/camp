var express = require("express");
var app = express();
var bodyParser = require("body-parser"); //to include body-parser

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true })); //to tell express to use body parser
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
//         name: "Camp Carnelley's, Naivasha",
//         image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Campcarnelleys-780x585.jpg",
//         description: "Let’s drive a little inland now and go to the great camping town of Naivasha. In Naivasha, not only will you find legendary roast meat at Kikopey, a few kilometers away, but you will also find exquisite camping sites such as Camp Carnelley’s. The owners describe it as a ‘hippy chic’ camp that offers the best ‘outdoorsy’ atmosphere you could hope for. The best part is that they provide the camping grounds right next to Lake Naivasha. You either bring your own tent or rent one from them. They have a fully stocked bar, a kitchen and Bandas, in case you are not looking to pitch a tent on your arrival night."
//     },
//     function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res) {
    res.render("landing");
});
//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
});
//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description }
        //create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds"); //it redirects to the get request campgrounds
        }
    });
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    //shows the form to update the campgrounds
    res.render("new");
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
});
app.get("*", function(req, res) {
    res.send("Sorry, Page Not Found... What Are You Doing With Your Life??");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!!");
});