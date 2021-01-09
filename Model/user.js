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
            productName: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            },
            price: {
              type: Number,
              required: true
            },
            quantityPrice: {
              type: Number,
              required: true
            },
            threshold_quantity: {
              type: Number,
              required: true
            }
          }
        ],
        totalPrice: {
          type: Number,
          required: true
        }
    }
});


userSchema.methods.addToCart = function(productId, quantity, price, productName, quantityPrice, threshold_qty) {
  const cartProductIndex = this.cart.items.findIndex(cartProduct => {
    return cartProduct.productId.toString() === productId;
  });
  console.log("Item found in location " + cartProductIndex);
  console.log("Quantity " + quantity + " Price " + price + " threshold qty " + threshold_qty + " quantity price " + quantityPrice);
  let newQuantity = quantity;
  let newPrice = price;
  const updatedCartItems = [...this.cart.items];
  let updatedTotalPrice = this.cart.totalPrice;

  if(cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + newQuantity;
    console.log("New Quatity is " + newQuantity);
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    if(newQuantity >= threshold_qty) {
      updatedCartItems[cartProductIndex].price = quantityPrice;
    } else {
      updatedCartItems[cartProductIndex].price = newPrice;
    }
    updatedTotalPrice = this.cart.totalPrice + (newQuantity * updatedCartItems[cartProductIndex].price);
  } else {
    updatedCartItems.push({
      productId: productId,
      productName: productName,
      quantity: newQuantity,
      price: newPrice,
      quantityPrice: quantityPrice,
      threshold_quantity: threshold_qty
    });
    if(quantity >= threshold_qty) {
      updatedTotalPrice = quantity*quantityPrice;
    } else {
      updatedTotalPrice = price*quantity;
    }
  }
  const updatedCart = {
    items: updatedCartItems,
    totalPrice: updatedTotalPrice
  };
  this.cart = updatedCart;

  return this.save();
}

userSchema.methods.removeItemFromCart = function(productId) {
  let removedItemPrice = 0;
  const updatedCartItems = this.cart.items.filter(item => {
    if (item.productId.toString() === productId.toString()) {
      removedItemPrice = item.price*item.quantity;
    }
    return item.productId.toString() !== productId.toString();
  });
  const updatedTotalPrice = this.cart.totalPrice - removedItemPrice;
  this.cart.items = updatedCartItems;
  this.cart.totalPrice = updatedTotalPrice;

  return this.save();
}

userSchema.methods.updateCart = function(quantityArray, i) {
  const cartItems = this.cart.items;
  let newTotalPrice = 0;
  cartItems.forEach((item) => {
    item.quantity = quantityArray[i];
    item.price = item.quantity*item.price;
    newTotalPrice += item.price;
    i++;
  });

  return this.save();
}

userSchema.methods.clearCart = function() {
  this.cart = {
    items: [],
    totalPrice: 0
  }
  return this.save();
}

module.exports = mongoose.model('User', userSchema);