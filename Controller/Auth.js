const bcrypt = require('bcryptjs');

const Admin = require("../Model/administrative");

exports.getLogin_page = (req, res, next) => {
    console.log(req.session);
    if (req.session.isLoggedIn) {
        res.redirect('/shop/rana_disposal');
    } else {
        res.render('auth_stuff/login', {
            pageTitle: 'Login',
            path: '/login/rana_disposal'
        });
    }
};

exports.postLogin = (req, res, next) => {
    const password = req.body.password;
    Admin.findById("5f62047ac2be48511ca9d9a8")
    .then(adminUser => {
        if(!adminUser) {
            console.log("Not an Admin User");
            req.flash('error', 'Invalid User');
            return res.redirect('/');
        }
        bcrypt.compare(password, adminUser.password)
        .then(result => {
            if (!result) {
                console.log("Not an Admin User");
                req.flash('error', 'Invalid Password!');
                return res.redirect('/');
            }
            console.log("User Found and Compared, Password Match");
            req.session.isLoggedIn = true;
            res.redirect('/shop/rana_disposal');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
    })
}