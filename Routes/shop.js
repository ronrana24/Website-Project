const shopController = require('../Controller/Shop');
const errorController = require('../Controller/Error');

const express = require('express');
const { route } = require('./admin');

// Router variable to route us to different routes
const router = express.Router();

// ROUTES -----------------------------------------

// HOME PAGE ROUTE --> /
router.get('/', shopController.getHome_Page);

// SHOP PAGE ROUTE --> /shop
router.get('/shop', shopController.getShop_page);

// CONTACT PAGE ROUTE --> /contact
router.get('/contact', shopController.getContact_Page);

// CART ROUTE --> /cart
router.get('/cart', shopController.getCart_Page);
// GET ITEM TO CART --> /add-to-cart/:productId
router.get('/add-to-cart/:productID', shopController.sendItemToCart);

// ERROR ROUTE--> IF OTHER THAN THE ABOVE ROUTES ARE REQUESTED
router.get('*', errorController.get404Error_Page);




// Export the whole module
module.exports = router;

