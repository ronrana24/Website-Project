const Product = require('../Model/product');

exports.getStatistics_Page = (req, res, next) => {
    res.render('admin_stuff/statistics_shop', {
        pageTitle: 'Information',
        path: '/shop/rana_disposal/info'
    });
};

exports.getAddProduct_Page = (req, res, next) => {
    res.render('admin_stuff/add_product', {
        pageTitle: 'Add-On',
        path: '/shop/rana_disposal/add'
    });
};

exports.postAddProduct = (req, res, next) => {
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var quantity_price = req.body.quantity_price;
    const product = new Product(name, price, quantity_price, quantity);
    product.save();
    console.log(Product.fetchAll());
    res.redirect('/shop');
}

exports.getAdminProducts_Page = (req, res, next) => {
    res.render('admin_stuff/admin_products', {
        pageTitle: 'Products',
        path: '/products/shop/rana_disposal'
    });
};