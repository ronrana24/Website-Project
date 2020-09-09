const Product = require('../Model/product');

// Gets The Home page of the Website
exports.getHome_Page = (req, res, next) => {
    res.render('user_stuff/home', {
        pageTitle: 'Rana Disposal\'s',
        path: '/'
    });
};

// Shop Page
exports.getShop_page = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('user_stuff/shop', {
        pageTitle: 'Shop',
        path: '/shop',
        products: products,
    });
}

// Contact Page
exports.getContact_Page = (req, res, next) => {
    res.render('user_stuff/contact', {
        pageTitle: 'Contact',
        path: '/contact'
    });
};

// Cart Page
exports.getCart_Page = (req, res, next) => {
    res.render('user_stuff/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
};

// Add to Cart Item
exports.sendItemToCart = (req, res, next) => {
    const productID = req.params.productID;
    const qty = req.query.quantity;
    console.log("Item " + productID + "--> " + qty);
    Product.findByID(productID, product => {
        console.log("Item " + product);
    })
}
