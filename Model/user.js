const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    shop_name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    cart: {
        items: [
          {   productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: { type: Number, required: true }
          }
        ]
    }
});


module.exports = mongoose.model('User', userSchema)