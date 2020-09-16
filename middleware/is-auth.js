// Middleware that checks the session if the admin is logged in or not

module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login/shop/rana_disposal');
    }
    next();
}