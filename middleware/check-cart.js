module.exports = (req, res, next) => {
    if(!req.user.cart.items.length > 0) {
        return res.redirect('/shop');
    }
    next();
}