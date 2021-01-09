// ----------------------- IMPORTS ------------------------------------------

const Product = require('../Model/product');
const Cart = require('../Model/cart');
const Order = require('../Model/order');
const date = require('date-and-time');
const User = require('../Model/user');
const bcrypt = require('bcryptjs');

//? ------------------------------------------------------------------------

// Gets The Home page of the Website
exports.getHome_Page = (req, res, next) => {
    res.render('user_stuff/home', {
        pageTitle: 'Rana Disposal\'s',
        path: '/'
    });
};

// Shop Page
exports.getShop_Page = (req, res, next) => {

    const query = req.query.product_type
    if(query.length === 0) {
        req.redirect("/lookbook");
    } else {

        //* Show all the products in the database
        Product.find()
        .then(products=> {
            console.log("Products Recevied --> ");
            res.render('user_stuff/shop', {
                pageTitle: 'Shop',
                path: '/shop',
                products: products,
                query: req.query.product_type
            });
            console.log(req.query.product_type);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

// LookBook Page
exports.getLookBook_page = (req, res, next) => {
    res.render('user_stuff/lookbook', {
        pageTitle: 'LookBook',
        path: '/lookbook',
    });
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
    let product_type;
    Product.findById(productId)
    .then(product => {
        product_type = product.product_type
        const productName = product.name;
        const quantityPrice = parseInt(product.quantity_price);
        const price = parseInt(product.price);
        const threshold_qty = parseInt(product.threshold_quantity);
        console.log("Adding item to cart --> ");
        return req.user.addToCart(productId, qty, price, productName, quantityPrice, threshold_qty);
    })
    .then(result => {
        console.log(result);
        res.redirect("/shop?product_type=" + product_type);
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
        cart: req.user.cart
    });   
};


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
    if (req.user) {
        if (req.user.cart.items.length > 0)  {
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
            req.session.save();
            res.redirect('/cart/rana_disposal/checkout/');
        }
    }
}

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
        const items = req.user.cart.items;
        items.forEach(item => {
            Product.findByIdAndUpdate(item.productId)
            .then(product => {
                product.quantity -= item.quantity;
                product.save();
            })
            .catch(err => {
                console.lof(err);
            });
        });
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
            cart: order.cart,
        });
    })
    .catch(err => console.log(err));
}
