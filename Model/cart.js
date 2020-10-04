module.exports = function Cart (oldCart) {
    this.items = oldCart.items || [];
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (id, price, quantity, name, quantity_price) {
       const currentItem_id = id;
       const i = this.items.findIndex(item => item.productId === id);
       if (i < 0) {
           this.items.push({
               productId: currentItem_id,
               productName: name,
               price: price,
               quantityPrice: quantity_price,
               quantity: quantity
           });
       } else {
            this.items[i].quantity += quantity;
            if (this.items[i].quantity > 10) {
                this.items[i].price = quantity_price;
            } else {
                this.items[i].price = price;
            }           
       }
        this.totalQuantity += quantity;
        this.totalPrice += price * quantity;
    }
}