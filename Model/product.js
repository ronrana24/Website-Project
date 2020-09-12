const mongodb = require('mongodb');

//* Reference to our database
const getDb = require('../util/database').getDb;

//* Product class
class Product {
    constructor(name, price, quantity_price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity_price = quantity_price
        this.quantity = quantity;
        // this.image = product_image;
    }

    //* Create a new Product and add it to our database
    save() {
        const db = getDb();
        return db.collection('products')
        .insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
        // this.id = uuidv4();
        // console.log("Saving Data...");
        // products.push({
        //     id: this.id,
        //     name: this.name,
        //     price: this.price,
        //     quantity_price: this.quantity_price,
        //     quantity: this.quantity
        // });
    }

    //* Return all the products in the database in the form of Array
    static fetchAll() {
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        }).catch(err => {
            console.log(err);
        });
    }

    //* Find product by its ID and return a single product
    static findById(productId) {
        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectID(productId)})
        .next()
        .then(product => {
            console.log("Product Found-->" + product);
            return product;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = Product;