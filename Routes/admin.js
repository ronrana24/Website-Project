const adminController = require('../Controller/Admin');

const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

// ROUTES --------------------------------------------------------------------------

// STATISTICS PAGE
router.get('/info', isAuth.isAdminLogged, adminController.getStatistics_Page);

// ADD PRODUCT PAGE
router.get('/add', isAuth.isAdminLogged, adminController.getAddProduct_Page);
router.post('/add', isAuth.isAdminLogged, adminController.postAddProduct);

// GET ALL PRODUCTS PAGE --> to edit the products
router.get('/products', isAuth.isAdminLogged, adminController.getAdminProducts_Page);

// EDIT PRODUCT PAGE
router.get('/edit/:productID', isAuth.isAdminLogged, adminController.getAdminProduct_editPage);
router.post('/edit/:productID', isAuth.isAdminLogged, adminController.postAdmin_ModifyProduct);

// DELETE PRODUCT FROM DATABASE
router.post('/delete/:productID', isAuth.isAdminLogged, adminController.deleteAdmin_Product);

// Admin Home Page
router.get('/', isAuth.isAdminLogged, adminController.getAdminHome_Page);

// List of all orders recievied
router.get('/orders', isAuth.isAdminLogged, adminController.getOrdersPage);

// Details of all orders
router.get('/order/:orderId', isAuth.isAdminLogged, adminController.getOrderDetails_page);



// Export the whole module
module.exports = router;