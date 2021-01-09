const express = require('express');

const router = express.Router();

const authController = require('../Controller/Auth');

const { check, body } = require('express-validator');
const { route } = require('./shop');
// const { route } = require('./shop');

// ROUTES ---------------------------------------------------------------

// Route to get the login form for the admin
router.get('/login/shop/rana_disposal', authController.getLogin_page);
router.post('/login/shop/rana_disposal', authController.postLogin);
router.get('/login/shop/rana_disposal/forgot', authController.forgot_password_page);
router.post('/login/shop/rana_disposal/forgot', authController.forgot_password);


router.get('/signup/shop/rana_disposal/', authController.getSignUp_Page);
router.post('/signup/shop/rana_disposal/', authController.addNewUser);

router.get('/logout/shop/rana_disposal', authController.logoutUser);

router.get('/shop/rana_disposal/admin/signup', authController.getAdminSignUp_Page);
router.post('/shop/rana_disposal/admin/signup', authController.addAdminUser);

router.get('/shop/rana_disposal/admin/signout', authController.logoutAdminUser);









module.exports = router;