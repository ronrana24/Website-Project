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
    const product = new Product({
        name: name,
        price: price,
        quantity_price: quantity_price,
        quantity: quantity
    });

    product.save()
    .then(result => {
        console.log("Product Created");
    })
    .catch(err => {
        console.log(err);
    });
    res.redirect('/shop');
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

exports.getAdminHome_Page = (req, res, next) => {
    res.render('user_stuff/login', {
        pageTitle: 'Admin Home',
        path: '/shop/rana_disposal'
    });
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
    
    //! unable to update the product
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