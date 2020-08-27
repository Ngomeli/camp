var express = require("express");
var app = express();
var bodyParser = require("body-parser"); //to include body-parser

app.use(bodyParser.urlencoded({ extended: true })); //to tell express to use body parser
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Rapids Camp, Sagana", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Rapid-Camp-Sagana.gif" },
    { name: "Malewa Bush Ventures, Naivasha", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Mayewa-Bush-Ventures.jpg" },
    { name: "Camp Carnelley's, Naivasha", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Campcarnelleys-780x585.jpg" },
    { name: "El Karama, Laikipia", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/El-Karama.jpg" },
    { name: "Kiboko Camp, Malindi", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Kiboko.jpg" },
    { name: "Mamba Village, Nairobi", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Mamba-Village-780x520.jpg" },
    { name: "Camp Malta, Thika", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Camp-Malta.jpg" },
    { name: "Kongoni Camp, Mt. Kenya", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/kongoni_camp.jpg" }
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {


    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image }
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds"); //it redirects to the get request campgrounds
});

app.get("/campgrounds/new", function(req, res) {
    //shows the form to update the campgrounds
    res.render("new");
});
app.get("*", function(req, res) {
    res.send("Sorry, Page Not Found... What Are You Doing With Your Life??");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!!");
});