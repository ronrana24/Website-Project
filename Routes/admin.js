const adminController = require('../Controller/Admin');

const express = require('express');

const router = express.Router();

// ROUTES --------------------------------------------------------------------------

// STATISTICS PAGE
router.get('/info', adminController.getStatistics_Page);

// ADD PRODUCT PAGE
router.get('/add', adminController.getAddProduct_Page);
router.post('/add', adminController.postAddProduct);

// GET ALL PRODUCTS PAGE --> to edit the products
router.get('/products', adminController.getAdminProducts_Page);

// EDIT PRODUCT PAGE
router.get('/edit/:productID', adminController.getAdminProduct_editPage);
router.post('/edit/:productID', adminController.postAdmin_ModifyProduct);

// DELETE PRODUCT FROM DATABASE
router.post('/delete/:productID', adminController.deleteAdmin_Product);

//* Admin Home Page
router.get('/', adminController.getAdminHome_Page);




// Export the whole module
module.exports = router;