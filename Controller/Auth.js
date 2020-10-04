const bcrypt = require('bcryptjs');

const Admin = require("../Model/administrative");

const User = require("../Model/user");

const { validationResult } = require('express-validator');

exports.getLogin_page = (req, res, next) => {
    // console.log("Checking if the user exist or not...");
    // console.log(req.session);
    if (req.session.customerLoggedIn) {
        res.redirect('/shop/rana_disposal/');
    } else {
        res.render('auth_stuff/login', {
            pageTitle: 'Login',
            path: '/login/shop/rana_disposal'
        });
    }
};

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    const password = req.body.password;
    const username = req.body.username;
    Admin.findById("5f62047ac2be48511ca9d9a8")
    .then(adminUser => {
        bcrypt.compare(password, adminUser.password)
        .then(result => {
            if (!result) {
                User.findOne({username: username})
                .then(user => {
                    if (!user) {
                        console.log("User name not found please sign up first or try again");
                        return res.redirect('/login/shop/rana_disposal/');
                    }
                    bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.customerLoggedIn = true;
                            req.session.user = user;
                            if (req.body.remember_me) {
                                req.session.remember_me = true;
                            } else {
                                req.session.remember_me = false;
                            }
                            req.session.save(err => {
                                console.log(err);
                            });
                            console.log("customer enterd successfully");
                            if (req.session.cart.items.length > 0) {
                                res.redirect('/cart/rana_disposal/checkout/');
                            } else {
                                res.redirect('/');
                            }
                        } else {
                            console.log("Dont match");
                            res.redirect('/login/shop/rana_disposal');
                        }
                    })
                });
            } else {
                console.log("User Found and Compared, Password Match");
                req.session.adminUserLoggedIn = true;
                req.session.adminName = username;
                return res.redirect('/shop/rana_disposal');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
    })
}

exports.getSignUp_Page = (req, res, next) => {
    console.log("You are here!")
    res.render('auth_stuff/signup', {
        pageTitle: "Sign-up",
        path: "/signup/shop/rana_disposal"
    });
}

exports.addNewUser = (req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    User.findOne({username: username})
    .then(user => {
        if (user) {
            console.log("User Found!")
            console.log(user);
            return res.redirect('/login/shop/rana_disposal/');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                username: username,
                password: hashedPassword,
                cart: {
                    items: [],
                    totalPrice: 0
                }
            });
            return user.save();
        })
        .then(result => {
            console.log("User is created");
            res.redirect('/shop');
        });
    })
    .catch(err => console.log(err));
    
    if (rePassword === password) {
        console.log("same Password");
    } else {
        console.log("Password does not matches with Repeat Password");
    }
    
}

exports.logoutUser = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}