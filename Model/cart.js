module.exports = function Cart (oldCart) {
    this.items = oldCart.items || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (id, price, quantity, name) {
       const currentItem_id = id;
       const i = this.items.findIndex(item => item._id === id);
       if (i < 0) {
           this.items.push({
               _id: currentItem_id,
               name: name,
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