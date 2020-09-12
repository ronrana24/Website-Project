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
    product
    .save().then(result => {
        console.log("Product Created");
    })
    .catch(err => {
        console.log(err);
    });
    res.redirect('/shop');
}

exports.getAdminProducts_Page = (req, res, next) => {
    res.render('admin_stuff/admin_products', {
        pageTitle: 'Products',
        path: '/shop/rana_disposal/products',
        products: Product.fetchAll()
    });
};

exports.getAdminProduct_editPage = (req, res, next) => {
    const id = req.params.productID;
    let selectedProduct;
    Product.findByID(id, product => {
        console.log("Product is " + product.name);
        selectedProduct = product;
    })

    res.render('admin_stuff/edit_product', {
        pageTitle: 'Edit Products',
        path: '/shop/rana_disposal/edit:productID',
        productID: id,
        product: selectedProduct
    });
    console.log(id + " is now being edited");
}