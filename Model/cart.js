const Product = require('./product');

var cart = [];

module.exports = class Cart {
    static addProduct(id) {
        cart.push({
            id: id
        })
        // Analyze the cart ==> find exixting product
        // Add new product/ increase quantity
    }
}