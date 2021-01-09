// -------------------- IMPORTS -------------------------------------------

const shopController = require('../Controller/Shop');
const errorController = require('../Controller/Error');
const isAuth = require('../middleware/is-auth');
const express = require('express');
const check_cart = require('../middleware/check-cart');
const check_user = require('../middleware/check_user');

// ------------------------------------------------------------------------

// -------- Router variable to route us to different routes----------------

const router = express.Router();

// ------------------------------------------------------------------------

// ------------------------------------------------------------ ROUTES -----------------------------------------

// HOME PAGE ROUTE --> /
router.get('/', shopController.getHome_Page);

// SHOP PAGE ROUTE --> /shop
router.get('/shop', shopController.getShop_Page);

// LOOKBOOK PAGE ROUTE --> /shop
router.get('/lookbook', shopController.getLookBook_page);

// CONTACT PAGE ROUTE --> /contact
router.get('/contact', shopController.getContact_Page);

// CART ROUTE --> /cart
router.get('/cart', check_user, shopController.getCart_Page);

// GET ITEM TO CART --> /add-to-cart/:productId
router.post('/add-to-cart/:productID', check_user, shopController.sendItemToCart);

// // Redirect if cart does not exist to prevent bogus orders
// router.get('/cart/rana_disposal/user_info', check_cart, shopController.getUserInfo_Page);
// router.post('/cart/rana_disposal/user_info', shopController.postUserInfo);

router.get('/cart/remove/:cartProductId', shopController.removeItemFromCart);

router.get('/cart/rana_disposal/checkout/', check_cart, isAuth.isCustomerLogged, shopController.getCheckout_Page);
router.post('/cart/rana_disposal/checkout/', check_cart, isAuth.isCustomerLogged, shopController.updatedCartSession);

router.post('/cart/rana_disposal/order', shopController.placeOrder);

router.get('/orders', shopController.getOrders_Page);
router.get('/order/:orderId', shopController.getOrderDetails_Page);

// router.post('/cart/rana_disposal/checkout', shopController.postCheckout);

// ERROR ROUTE--> IF OTHER THAN THE ABOVE ROUTES ARE REQUESTED
router.get('*', errorController.get404Error_Page);

// ---------------------------------------------------------------------------------------------------------------------------




// ---------------------- Export the whole module -------------------------

module.exports = router;

// ------------------------------------------------------------------------

