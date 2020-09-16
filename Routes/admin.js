const adminController = require('../Controller/Admin');

const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

// ROUTES --------------------------------------------------------------------------

// STATISTICS PAGE
router.get('/info', isAuth, adminController.getStatistics_Page);

// ADD PRODUCT PAGE
router.get('/add', isAuth, adminController.getAddProduct_Page);
router.post('/add', isAuth, adminController.postAddProduct);

// GET ALL PRODUCTS PAGE --> to edit the products
router.get('/products', isAuth, adminController.getAdminProducts_Page);

// EDIT PRODUCT PAGE
router.get('/edit/:productID', isAuth, adminController.getAdminProduct_editPage);
router.post('/edit/:productID', isAuth, adminController.postAdmin_ModifyProduct);

// DELETE PRODUCT FROM DATABASE
router.post('/delete/:productID', isAuth, adminController.deleteAdmin_Product);

//* Admin Home Page
router.get('/', isAuth, adminController.getAdminHome_Page);




// Export the whole module
module.exports = router;