const shopController = require('../Controller/Shop');
const errorController = require('../Controller/Error');

const express = require('express');

const check_cart = require('../middleware/check-cart');

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

// // Redirect if cart does not exist to prevent bogus orders
// router.get('/cart/rana_disposal/user_info', check_cart, shopController.getUserInfo_Page);
// router.post('/cart/rana_disposal/user_info', shopController.postUserInfo);

router.get('/cart/remove/:cartProductId', shopController.removeItemFromCart);

router.get('/cart/rana_disposal/checkout/', check_cart, shopController.getCheckout_Page);
router.post('/cart/rana_disposal/checkout/', check_cart, shopController.updatedCartSession);

router.post('/cart/rana_disposal/order', shopController.placeOrder);

// router.post('/cart/rana_disposal/checkout', shopController.postCheckout);

// ERROR ROUTE--> IF OTHER THAN THE ABOVE ROUTES ARE REQUESTED
router.get('*', errorController.get404Error_Page);




// Export the whole module
module.exports = router;

