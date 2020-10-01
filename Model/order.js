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
    }
});

module.exports = mongoose.model('Order', orderSchema);