const Product = require('../Model/product');
const Order = require('../Model/order');

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
    console.log(req.body.option);
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var quantity_price = req.body.quantity_price;
    const threshold_quantity = req.body.threshold_quantity;
    var product_type = req.body.option;
    const product = new Product({
        name: name,
        price: price,
        quantity_price: quantity_price,
        quantity: quantity,
        threshold_quantity: threshold_quantity,
        product_type: product_type
    });

    product.save()
    .then(result => {
        console.log("Product Created");
    })
    .catch(err => {
        console.log(err);
    });
    res.redirect('/shop/rana_disposal/products');
}

exports.getAdminProducts_Page = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('admin_stuff/admin_products', {
            pageTitle: 'Products',
            path: '/shop/rana_disposal/products',
            products: products
        });
    })
};

exports.getAdminProduct_editPage = (req, res, next) => {
    const productId = req.params.productID;
    Product.findById(productId)
    .then(product => {
        console.log("Product Id:- " + productId);
        console.log("Your Product is being edited:");
        console.log(product);
        res.render('admin_stuff/edit_product', {
            pageTitle: 'Edit Product',
            path: '/shop/rana_disposal/edit:productID',
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            quantity_price: product.quantity_price,
            id: productId
        });
    })
    .catch(err => {
        console.log(err);
    })
    // let selectedProduct;
    // Product.findByID(id, product => {
    //     console.log("Product is " + product.name);
    //     selectedProduct = product;
    // })

    // res.render('admin_stuff/edit_product', {
    //     pageTitle: 'Edit Products',
    //     path: '/shop/rana_disposal/edit:productID',
    //     productID: id,
    //     product: selectedProduct
    // });
    // console.log(id + " is now being edited");
}

exports.deleteAdmin_Product = (req, res, next) => {
    const productId = req.params.productID;
    console.log(productId + " is being deleted!");
    Product.findOneAndDelete(productId)
    .then(() => {
        console.log("DESTROYED!");
        res.redirect('/shop/rana_disposal/products');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postAdmin_ModifyProduct = (req, res, next) => {
    const productId = req.params.productID;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const updatedQuantityPrice = req.body.quantity_price;
    const updatedQuantity = req.body.quantity;
    
    Product.findById(productId)
    .then(product => {
        console.log("Product is being modified --> " + productId);
        product.name = updatedName;
        product.price = updatedPrice;
        product.quantity = updatedQuantity;
        product.quantity_price = updatedQuantityPrice;
        return product.save();
    })
    .then(result => {
        console.log("Updated Product!");
        res.redirect('/shop/rana_disposal/products');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getAdminHome_Page = (req, res, next) => {
    console.log("Welcome --> " + req.session.adminName + " To admin page");
    res.render('admin_stuff/admin_home', {
        pageTitle: 'Admin Home',
        path: '/shop/rana_disposal',
        name: req.session.adminName
    });
} 

exports.getOrdersPage = (req, res, next) => {
    Order.find()
    .then(orders => {
        console.log(orders);
        res.render('admin_stuff/orders', {
            pageTitle: 'Orders',
            path: '/shop/rana_disposal/orders',
            name: req.session.adminUserName,
            orders: orders
            // session: req.session
        }); 
    })
    .catch(err => console.log(err));
    // req.session.destroy();
}

exports.getOrderDetails_page = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .then(order => {
        console.log("Details of Recieved order is");
        console.log(order);
        res.render('admin_stuff/admin_orderDetails', {
            pageTitle: "Order of " + order.user.name,
            path: '/shop/rana_disposal/order'+ orderId,
            order: order,
            cart: order.cart
        });
    })
    .catch(err => console.log(err));
}