const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    threshold_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Product', productSchema)











// const mongodb = require('mongodb');

// //* Reference to our database
// const getDb = require('../util/database').getDb;

// //* Product class
// class Product {
//     constructor(name, price, quantity_price, quantity, id) {
//         this.name = name;
//         this.price = price;
//         this.quantity_price = quantity_price
//         this.quantity = quantity;
//         this._id = id ? new mongodb.ObjectID(id) : null;
//         // this.image = product_image;
//     }

//     //* Create a new Product and add it to our database
//     save() {
//         const db = getDb();
//         let dbOp;
        
//         //* If product id is given then update the given product else make new Product
//         if (this._id) {
//             dbOp = db.collection('products').updateOne({_id: this._id}, { $set: this });
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }

//         return dbOp
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     //* Return all the products in the database in the form of Array
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//         .find()
//         .toArray()
//         .then(products => {
//             console.log("Fetching All Products in the form of Array:")
//             console.log(products);
//             return products;
//         }).catch(err => {
//             console.log(err);
//         });
//     }

//     //* Find product by its ID and return a single product
//     static findById(productId) {
//         const db = getDb();
//         return db.collection('products')
//         .find({_id: new mongodb.ObjectID(productId)})
//         .next()
//         .then(product => {
//             console.log("Product Found-->" + product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }

//     static DeleteById(productId) {
//         const db = getDb();
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectID.ObjectID(productId)})
//         .then(result => {
//             console.log("Product Id -> " + productId + " Deleted!");

//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }
// }

// module.exports = Product;