const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    selfPickUp: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    time: {
        type: String
    },
    cart: {
        items: [
          {   
            // productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
            name: {type: String, required: true},
            price: {type: Number ,required: true},
            quantity: { type: Number, required: true }
          }
        ],
        totalPrice: {
            type: Number,
            require: true
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);