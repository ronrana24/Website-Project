module.exports = (req, res, next) => {
    if(!req.session.cart) {
        return res.redirect('/shop');
    }
    next();
}