// Middleware that checks the session if the admin is logged in or not

exports.isAdminLogged = (req, res, next) => {
    if (!req.session.adminUserLoggedIn) {
        return res.redirect('/login/shop/rana_disposal');
    }
    next();
}

exports.isCustomerLogged = (req, res, next) => {
    if (!req.session.customerLoggedIn) {
        return res.redirect('/login/shop/rana_disposal');
    }
    next();
}