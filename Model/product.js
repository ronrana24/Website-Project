var products = [
    {
        id: 'df5e647f-0aeb-4f15-9242-d21f5df68c07',
        name: 'Rahul Rana',
        price: '11',
        quantity_price: '22',
        quantity: '44'
      },
      {
        id: 'c6099354-d91b-4261-8100-da7b15ce71c5',
        name: 'asas',
        price: '100',
        quantity_price: '120',
        quantity: '150'
      }
];
const { v4: uuidv4 } = require('uuid');

module.exports = class Product {
    constructor(name, price, quantity_price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity_price = quantity_price
        this.quantity = quantity;
        // this.image = product_image;
    }

    save() {
        this.id = uuidv4();
        console.log("Saving Data...");
        products.push({
            id: this.id,
            name: this.name,
            price: this.price,
            quantity_price: this.quantity_price,
            quantity: this.quantity
        });
    }

    static fetchAll() {
        return products;
    }
    static findByID(id, cb) {
        products.forEach(function (product) {
            if (product.id === id) {
                cb(product);
            }
        })
    }
}