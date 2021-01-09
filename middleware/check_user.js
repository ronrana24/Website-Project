module.exports = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.redirect("/login/shop/rana_disposal")
    }
}