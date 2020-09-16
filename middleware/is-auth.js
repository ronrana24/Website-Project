module.export = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.render('/login/rana_disposal');
    }
    next();
}