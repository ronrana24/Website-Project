const Product = require('../Model/product');
const Cart = require('../Model/cart');

// Gets The Home page of the Website
exports.getHome_Page = (req, res, next) => {
    res.render('user_stuff/home', {
        pageTitle: 'Rana Disposal\'s',
        path: '/',
    });
};

// Shop Page
exports.getShop_page = (req, res, next) => {

    //* Show all the products in the database
    Product.find()
    .then(products=> {
        res.render('user_stuff/shop', {
            pageTitle: 'Shop',
            path: '/shop',
            products: products,
        });
    })
    .catch(err => {
        console.log(err);
    })
}

// Contact Page
exports.getContact_Page = (req, res, next) => {
    res.render('user_stuff/contact', {
        pageTitle: 'Contact',
        path: '/contact',
    });
};

// Cart Page
exports.getCart_Page = (req, res, next) => {
    res.render('user_stuff/cart', {
        pageTitle: 'Cart',
        path: '/cart',  
    });
};

// Add to Cart Item
exports.sendItemToCart = (req, res, next) => {
    const productId = req.params.productID;
    const qty = req.query.quantity;
    let price;
    Product.findById(productId)
    .then(product => {
        console.log("Adding item to cart --> ");
        console.log(product);
        res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    })
}
