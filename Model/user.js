const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
    },
    cart: {
        items: [
          {   productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
            quantity: {
              type: Number,
              required: true
            },
            price: {
              type: Number,
              required: true
            }
          }
        ]
    }
});


userSchema.methods.addToCart = function(product, quantity, price) {
  const cartProductIndex = this.cart.items.indexOf(cartProduct => {
    return cartProduct.productId.toString() === product._id.toString();
  });
  let newQuantity = quantity;
  let newPrice = price;
  const updatedCartItems = [...this.cart.items];

  if(cartProductIndex >= 0) {
    // newQuantity = this.cart.items[cartProductIndex].quantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedCartItems[cartProductIndex].price = newPrice*newQuantity
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      price: newPrice*newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
}

module.exports = mongoose.model('User', userSchema);