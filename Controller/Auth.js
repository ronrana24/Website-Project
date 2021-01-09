const bcrypt = require('bcryptjs');

const isAuth = require('../middleware/is-auth'); 

const Admin = require("../Model/administrative");

const User = require("../Model/user");

const { validationResult } = require('express-validator');

exports.getLogin_page = (req, res, next) => {
    if (req.session.adminUserLoggedIn) {
        res.redirect('/shop/rana_disposal/');
    } else {
        res.render('auth_stuff/login', {
            pageTitle: 'Login',
            path: '/login/shop/rana_disposal',
            errorMessage: req.flash('error')
        });
    }
};

exports.postLogin = (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;
    Admin.findById("5f7dad2e158d2e5e048fa073")
    .then(adminUser => {
        bcrypt.compare(password, adminUser.password)
        .then(result => {
            if (!result) {
                User.findOne({username: username})
                .then(user => {
                    if (!user) {
                        req.flash('error', 'Email or Password does not match.');
                        console.log("User name not found please sign up first or try again");
                        return res.redirect('/login/shop/rana_disposal/');
                    }
                    bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.customerLoggedIn = true;
                            req.session.user = user;
                            if (!req.body.remember_me) {
                                req.session.cookie.maxAge = 1 * 60 * 60 * 1000;
                            }

                            if (req.session.cart.items.length > 0) {
                                res.redirect(307, '/cart/rana_disposal/checkout/');
                            } else {
                                res.redirect('/');
                            }
                        } else {
                            console.log("Don't match");
                            res.redirect('/login/shop/rana_disposal');
                        }
                    })
                });
            } else {
                console.log("User Found and Compared, Password Match");
                if (!req.body.remember_me) {
                    req.session.cookie.maxAge = 12 * 60 * 60 * 1000;
                }
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
            res.redirect('/login/shop/rana_disposal');
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

exports.getAdminSignUp_Page = (req, res, next) => {
    res.render('auth_stuff/adminSignup', {
        pageTitle: "Admin Sign-up",
    });
}
exports.addAdminUser = (req, res, next) => {
    const password = req.body.password;
    const rePassword = req.body.rePassword;
    const name = req.body.name;

    if(password === rePassword) {
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const adminUser = new Admin({
                password: hashedPassword
            });
            return adminUser.save();
        })
        .then(result => {
            req.session.adminUserLoggedIn = true;
            req.session.adminName = name;
            res.redirect('/shop/rana_disposal');
        })
        .catch(err => {
            console.log(err);
        });
    }
}

exports.logoutAdminUser = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}

exports.forgot_password_page = (req, res, next) => {
    res.render('auth_stuff/forgot_password', {
        pageTitle: "Forgot Password",
        path: "/login/shop/rana_disposal/forgot"
    });
}

exports.forgot_password = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (confirm_password == password) {
        User.findOne({"username": username})
        .then(user => {
            return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                user.password = hashedPassword;
                return user.save();
            })
            .then(result => {
                console.log("Password has been changed");
                res.redirect('/login/shop/rana_disposal');
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}