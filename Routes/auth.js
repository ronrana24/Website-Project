const express = require('express');

const router = express.Router();

const authController = require('../Controller/Auth');

const { check, body } = require('express-validator');
// const { route } = require('./shop');

// ROUTES ---------------------------------------------------------------

// Route to get the login form for the admin
router.get('/login/shop/rana_disposal', authController.getLogin_page);
router.post('/login/shop/rana_disposal', [
    body('password', 'Please Enter a Valid Password')
], authController.postLogin);


router.get('/signup/shop/rana_disposal/', authController.getSignUp_Page);
router.post('/signup/shop/rana_disposal/', authController.addNewUser);

router.get('/logout/shop/rana_disposal', authController.logoutUser);









module.exports = router;