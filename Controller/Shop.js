const Product = require('../Model/product');
const Cart = require('../Model/cart');
const Order = require('../Model/order');

const date = require('date-and-time');

const User = require('../Model/user');

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
    const qty = parseInt(req.body.quantity);
    const cart = new Cart(req.session.cart ? req.session.cart : {items: []});
    Product.findById(productId)
    .then(product => {
        const productName = product.name;
        const quantityPrice = parseInt(product.quantity_price);
        let price;
        // threshold quantity
        if (qty >= 10) {
            price = parseInt(product.quantity_price);
        } else {
            price = parseInt(product.price);
        } 
        console.log("Adding item to cart --> ");
        if (req.user) {
            return req.user.addToCart(productId, qty, price, productName, quantityPrice);
        } else {
            cart.add(productId, price, qty, productName, product.quantity_price);
            return req.session.cart = cart;
        }
    })
    .then(result => {
        console.log(result);
        res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    });
}

// Cart Page
exports.getCart_Page = (req, res, next) => {
    res.render('user_stuff/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cart: req.user ? req.user.cart : req.session.cart
    });   
};

// exports.getUserInfo_Page = (req, res, next) => {
//     console.log(req.body)
//     if(req.query.checkout === '') {
//         res.render('user_stuff/checkout', {
//             pageTitle: "Checkout",
//             path: '/cart/rana_disposal/user_info'
//         });
//     } else {
//         res.redirect('/shop');
//     }
// };

exports.removeItemFromCart = (req, res, next) => {
    const productId = req.params.cartProductId;
    console.log("Your poduct is now removing " + productId);  
    if (req.user) {
        req.user
        .removeItemFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    } else {
        const cartItems = req.session.cart.items;
        const index = cartItems.findIndex(item => {
            return item.productId === productId;
        });
        cartItems.splice(index, 1);
        res.redirect('/cart');
    }
    
}

exports.getCheckout_Page = (req, res, next) => {
    res.render('user_stuff/checkout', {
        pageTitle: "User Info",
        path: '/cart/rana_disposal/checkout/',
        cartItems: req.user.cart.items ? req.user.cart.items : req.session.cart.items,
        cart: req.user.cart ? req.user.cart : req.session.cart
    });
}

exports.updatedCartSession = (req, res, next) => {
    if(req.body.update === '') {
        res.redirect('/shop');
    } else {
        if (req.user) {
            const quantityArray = req.body.quantity;
            req.user.updateCart(quantityArray, 0)
            .then(result => {
                res.redirect('/cart/rana_disposal/checkout/');
            })
            .catch(err => console.log(err));
        } else {
            console.log(req.body);
            const cart = req.session.cart;
            const quantity = req.body.quantity;
            let i=0;
            let totalQuantity = 0;
            let totalPrice = 0;
            cart.items.forEach(item => {
                item.quantity = parseInt(quantity[i]);
                totalQuantity += parseInt(quantity[i]);
                if (item.quantity > 10) {
                    item.price = item.quantityPrice;
                }
                totalPrice += item.price * item.quantity;
                i++;
            });
            cart.totalQuantity = totalQuantity;
            cart.totalPrice = totalPrice;
            res.redirect('/login/shop/rana_disposal');
        }
    }
};

exports.placeOrder = (req, res, next) => {

    const now = new Date();

    const order = new Order({
        user: {
            name: req.user.name,
            userId: req.user
        },
        cart: req.user.cart,
        date: date.format(now, 'YYYY/MM/DD hh:mm A')
    });
    return order.save()
    .then(cart => {
        if (!req.session.remember_me) {
            req.session.destroy();
        }
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));

    // req.user
    // .populate('cart.items.productId')
    // .execPopulate()
    // .then(user => {
    //     const products = user.cart.items.map(i => {
    //         return {quantity: i.quantity, item: {...i.productId._doc }}
    //     });
    //     const order = new Order({
    //         user: {
    //             name: req.user.name,
    //             userId: req.user
    //         },
    //         items: products
    //     });
    //     return order.save();
    // })
    // .then(cart => {
    //     return req.user.clearCart();
    // })
    // .then(result => {
    //     res.redirect('/');
    // })
    // .catch(err => console.log(err));

}

exports.getOrders_Page = (req ,res, next) => {

    Order.find({ "user.userId": req.user._id })
    .then(orders => {
        console.log(orders);
        res.render('user_stuff/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
}

exports.getOrderDetails_Page = (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    Order.findById(orderId)
    .then(order => {
        console.log("Requested Order");
        console.log(order);
        res.render('user_stuff/order_details', {
            pageTitle: "Your Order",
            cart: order.cart
        });
    })
    .catch(err => console.log(err));
}
