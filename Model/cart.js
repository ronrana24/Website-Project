module.exports = function Cart (oldCart) {
    this.items = oldCart.items || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (id, price, quantity) {
       const currentItem_id = id;
       const i = this.items.findIndex(item => item._id === id);
       if (i < 0) {
           this.items.push({
               _id: currentItem_id,
               price: price,
               quantity: quantity
           });
       } else {
           this.items[i].price += price * quantity;
           this.items[i].quantity += quantity;
       }
       this.totalQuantity += quantity;
        this.totalPrice += price * quantity;
    }
}


// const Product = require('./product');

// var cart = {
//     products: [],
//     totalPrice: 0
// };

// module.exports = class Cart {
//     static addProduct_toCart(id, productPrice, quantity) {
//         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//         const existingProduct = cart.products[existingProductIndex];
//         let updatedProduct;

//         //* -------- ADD NEW PRODUCT/INCREASE PRODUCT QUANTITY -----------------
//         if (existingProduct) {
             // Takes all the properties of the existing product and copy it into the --> updatedProduct variable
//             updatedProduct = {...existingProduct};
//             updatedProduct.quantity += parseInt(quantity);
//             cart.products = [...cart.products];
//             cart.products[existingProductIndex] = updatedProduct;
//         } else {
//             updatedProduct = {
//                 id: id,
//                 price: quantity*productPrice,
//                 quantity: parseInt(quantity)
//             };
//             cart.products = [...cart.products, updatedProduct];
//         }
//         cart.totalPrice += parseInt(productPrice*quantity);
//         console.log("Adding Item to cart ...")
//     }
//     static fetchAllCart() {
//         return cart;
//     }
// }