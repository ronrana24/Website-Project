var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

const mongoConnect = require('./util/database').mongoConnect;


const User = require('./Model/user');

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
const adminRoutes = require('./Routes/admin');
// Authentication Route
const authRoutes = require('./Routes/auth');

// SERVER TO HANDLE ROUTES ------------------------------------

app.use('/shop/rana_disposal', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

mongoose.connect('mongodb+srv://ronrana:zuLe04F6G9oLri3X@cluster0.xyk0z.gcp.mongodb.net/RanaDisposal?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Database Connected!");
    // App listen -------------------------------------
    var PORT = 3000;
    app.listen(PORT, function() {
        console.log("Go to port 3000 :)");
    });
})
.catch(err => {
    console.log(err);
})





