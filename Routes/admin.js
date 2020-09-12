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
router.get('/edit/:productID', adminController.getAdminProduct_editPage)




// Export the whole module
module.exports = router;