const Product = require('../Model/product');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: {
        items: [],
        totalPrice: {
            type: Number,
            required: true
        }
    },
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    date: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number
    },
    address: {
        type: String
    }
});

// orderSchema.methods.decreaseQuantityOnPlaceOrder = function(items) {
//     items.forEach(item => {
//         Product.findByIdAndUpdate(item.productId)
//         .then(product => {
//             product.quantity -= item.quantity;
//         })
//         .catch(err => {
//             console.lof(err);
//         });
//     });
//     return Product.save();
// }

module.exports = mongoose.model('Order', orderSchema);