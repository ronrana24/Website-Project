var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// this will serve the content of public folder
app.use(express.static("public"));

// viewing ejs file without extension
app.set("view engine", "ejs");

app.set('views', 'views');

// ROUTES VARIABLES -------------------------------

// Shop Route
const shopRoutes = require('./Routes/shop');
// Administrator Route
const adminRoute = require('./Routes/admin');

// SERVER TO HANDLE ROUTES ------------------------------------

app.use('/shop/rana_disposal', adminRoute);
app.use(shopRoutes);

// App listen -------------------------------------

var PORT = 3000;
app.listen(PORT, function() {
    console.log("Go to port 3000 :)");
});
