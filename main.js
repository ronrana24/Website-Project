// All the Fuctionalities -----------------------------------
// const fs = require('fs');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const Cart = require('./Model/cart');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

// My database URL--------------------------------
const MONGODB_URI = `mongodb+srv://
${process.env.MONGO_USER}:
${process.env.MONGO_PASSWORD}@cluster0.xyk0z.gcp.mongodb.net/
${process.env.MONGO_DEFAULT_DATABASE}`;


const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

const User = require('./Model/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
        secret: 'Name of the website is Rana Disposal\'s and is created by Rahul Rana and this is the SECRET!',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// to add CSRF Protection / to stop the steeling of the my sessions   
app.use(csrfProtection);

// to add message to font-end side 
app.use(flash());

// this will serve the content of public folder
app.use(express.static("public"));

// viewing ejs file without extension
app.set("view engine", "ejs");
app.set('views', 'views');

app.use((req, res, next) => {
    if (!req.session.user) {
        const cart = new Cart(req.session.cart ? req.session.cart : {items: []});
        req.session.cart = cart;
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

// local variable for all the views to protect steeling my sessions--------------------
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.cartItems = req.user ? req.user.cart.items.length : req.session.cart.items.length;
    res.locals.customerLoggedIn = req.session.customerLoggedIn;
    next();
});

// ROUTES VARIABLES -------------------------------

// Shop Route
const shopRoutes = require('./Routes/shop');
// Administrator Route
const adminRoutes = require('./Routes/admin');
// Authentication Route
const authRoutes = require('./Routes/auth');

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(helmet());
// app.use(compression());
// app.use(morgan('combined', { stream: accessLogStream }));

// SERVER TO HANDLE ROUTES ------------------------------------
app.use('/shop/rana_disposal', adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

// Coonecting to mongoose Database i.e. --> RanaDisposal --------------------------
mongoose
.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    // App listen
    app.listen(process.env.PORT || 3000);
    
})
.catch(err => {
    console.log(err);
});