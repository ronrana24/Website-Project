module.exports = (req, res, next) => {
    if (req.user) {
        if (req.user.cart.items.length > 0) {
            next();
        } else {
            return res.redirect('/shop');
        }
    } else {
        if (req.session.cart.items.length > 0) {
            next();
        } else {
            return res.redirect('/shop');
        }
    }
}