const Product = require('../Model/product');
const Cart = require('../Model/cart');
const Order = require('../Model/order');

const bcrypt = require('bcryptjs');

// Gets The Home page of the Website
exports.getHome_Page = (req, res, next) => {
    res.render('user_stuff/home', {
        pageTitle: 'Rana Disposal\'s',
        path: '/'
    });
};

// Shop Page
exports.getShop_page = (req, res, next) => {

    //* Show all the products in the database
    Product.find()
    .then(products=> {
        console.log("Products Recevied --> ");
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

// Add to Cart Item
exports.sendItemToCart = (req, res, next) => {
    const productId = req.params.productID;
    const qty = parseInt(req.query.quantity);
    const cart = new Cart(req.session.cart ? req.session.cart : {items: []});
    Product.findById(productId)
    .then(product => {
        const productName = product.name;
        let price;
        // threshold quantity
        if (qty >= 10) {
            price = parseInt(product.quantity_price);
        } else {
            price = parseInt(product.price);
        } 
        console.log("Adding item to cart --> ");
        // cart.add(productId, price, qty, productName, product.quantity_price);
        // req.session.cart = cart;
        console.log(req.session.cart.items);
        res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    })
}

// Cart Page
exports.getCart_Page = (req, res, next) => {
    res.render('user_stuff/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cart: req.session.cart,
        cartLength: req.session.cart ? req.session.cart.items.length : 0,
    });
};

exports.getUserInfo_Page = (req, res, next) => {
    if(req.query.checkout === '') {
        res.render('user_stuff/checkout', {
            pageTitle: "User Info",
            path: '/cart/rana_disposal/user_info'
        });
    } else {
        res.redirect('/shop');
    }
};

exports.removeItemFromCart = (req, res, next) => {
    const productId = req.params.cartProductId;
    console.log("Your poduct is now removing " + productId);
    const cart = req.session.cart;
    const cartItems = req.session.cart.items;
    const index = cartItems.findIndex(product => product._id === productId);
    console.log("Item is at index " + index);
    const item = cartItems[index];
    console.log(item);
    cart.totalPrice = cart.totalPrice - (item.price*item.quantity);
    cart.totalQuantity = cart.totalQuantity - item.quantity;
    cartItems.splice(index, 1);
    res.redirect('/cart');
}

exports.getCheckout_Page = (req, res, next) => {
    res.render('user_stuff/checkout', {
        pageTitle: "User Info",
        path: '/cart/rana_disposal/checkout/',
        cartItems: req.session.cart.items,
        cart: req.session.cart
    });
}

exports.updatedCartSession = (req, res, next) => {
    if(req.body.update === '') {
        res.redirect('/shop');
    } else {
        const quantityArray = req.body.quantity;
        const cart = req.session.cart;
        const cartItems = req.session.cart.items;
        let totalPrice = 0;
        let totalQuantity = 0;
        for(let i=0;i<cartItems.length;i++) {
            let item = cartItems[i];
            item.quantity = parseInt(quantityArray[i]);
            if(item.quantity >= 10) {
                item.price = item.quantity_price;
            }
            totalPrice += item.price*item.quantity;
            totalQuantity += item.quantity;
        }
        cart.totalPrice = totalPrice;
        cart.totalQuantity = totalQuantity;
        console.log(cart);
        res.redirect('/cart/rana_disposal/checkout/');
    }
};

exports.placeOrder = (req, res, next) => {
    const businessName = req.body.name;
    const time = req.body.time;
    const dateOfArrival = time.slice(0, 10);
    const timeOfArrival = time.slice(11, time.length);
    const delivery = req.body.Delivery;

    let address = false;
    let phonenumber = "0";
    let selfPickUp = true;
    let firstName = false;
    let lastName = false;


    if (delivery === "on") {
        address = req.body.delivery_address;
        phonenumber = req.body.phonenumber;
        selfPickUp = false;
    }

    const cart = req.session.cart;

    const order = new Order({
        businessName: businessName,
        selfPickUp: selfPickUp,
        phoneNumber: phonenumber,
        address: address,
        time: timeOfArrival + " on " + dateOfArrival,
        cart: cart
    });
    order.save()
    .then(result => {
        console.log("Order Placed!");
    })
    .catch(err => {
        console.log(err);
    });
    console.log(req.session.cart);
    req.session.cart.items = [];
    req.session.cart.totalPrice = 0;
    req.session.cart.totalQuantity = 0;

    res.redirect('/');
}
