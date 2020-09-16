const express = require('express');

const router = express.Router();

const authController = require('../Controller/Auth');

// ROUTES ---------------------------------------------------------------

// Route to get the login form for the admin
router.get('/login/shop/rana_disposal', authController.getLogin_page);
router.post('/login/shop/rana_disposal', authController.postLogin);






module.exports = router;