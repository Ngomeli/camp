var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Rapids Camp, Sagana", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Rapid-Camp-Sagana.gif" },
        { name: "Malewa Bush Ventures, Naivasha", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Mayewa-Bush-Ventures.jpg" },
        { name: "Camp Carnelley's, Naivasha", image: "http://www.travelstart.co.ke/blog/wp-content/uploads/2014/08/Campcarnelleys-780x585.jpg" }
    ]

    res.render("campgrounds", { campgrounds: campgrounds });
});

//app.get("*", function(req, res) {
//  res.send("Sorry, Page Not Found... What Are You Doing With Your Life??");
//});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("YelpCamp Server Has Started!!");
});