const Product = require('../Model/product');
const Cart = require('../Model/cart');

// Gets The Home page of the Website
exports.getHome_Page = (req, res, next) => {
    res.render('user_stuff/home', {
        pageTitle: 'Rana Disposal\'s',
        path: '/',
        cart_items: Cart.fetchAllCart().products.length
    });
};

// Shop Page
exports.getShop_page = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('user_stuff/shop', {
        pageTitle: 'Shop',
        path: '/shop',
        products: products,
        cart_items: Cart.fetchAllCart().products.length
    });
}

// Contact Page
exports.getContact_Page = (req, res, next) => {
    res.render('user_stuff/contact', {
        pageTitle: 'Contact',
        path: '/contact',
        cart_items: Cart.fetchAllCart().products.length
    });
};

// Cart Page
exports.getCart_Page = (req, res, next) => {
    res.render('user_stuff/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cart_items: Cart.fetchAllCart().products.length
    });
};

// Add to Cart Item
exports.sendItemToCart = (req, res, next) => {
    const productID = req.params.productID;
    const qty = req.query.quantity;
    let price;
    Product.findByID(productID, product => {
        console.log("Item " + product);
        price = product.price;
    });
    Cart.addProduct_toCart(productID, price, qty);
    console.log(Cart.fetchAllCart());
    res.redirect('/shop');
}
