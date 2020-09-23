const Product = require('../Model/product');
const Cart = require('../Model/cart');

const bcrypt = require('bcryptjs');

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
        console.log("Products Recevied --> ");
        console.log(products);
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
    const qty = parseInt(req.query.quantity);
    const cart = new Cart(req.session.cart ? req.session.cart : {items: []});
    Product.findById(productId)
    .then(product => {
        console.log("Product added to cart is --> ");
        console.log(product);
        const price = parseInt(product.price);
        console.log("Adding item to cart --> ");
        cart.add(productId, price, qty);
        req.session.cart = cart
        console.log(req.session);
        res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getUserInfo_Page = (req, res, next) => {
    res.render('user_stuff/checkout', {
        pageTitle: "User Info",
        path: '/cart/rana_disposal/user_info'
    });
};

exports.postUserInfo = (req, res, next) => {
    const name = req.body.name;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const isPayNow = req.body.isPayNow;
    console.log("Pay now button is --> " + isPayNow);

    req.session.user_info = {
        name: name,
        phonenumber: phonenumber,
        address: address
    };
    console.log("User info added to the session--> ");
    console.log(req.session);
    //! if pay now is on redirect to payment gateway else to confirm order route
    return res.redirect('/');
};

exports.getCheckout_Page = (req, res, next) => {
    res.render('user_stuff/checkout', {
        pageTitle: "Checkout",
        path: '/cart/rana_disposal/checkout/:sessionId'
    });
};

// exports.postCheckout = (req, res, next) => {
//     console.log("Session")
// }
