function increment_value(productId, qty_price) {
    const input_quantity = document.getElementsByClassName("input")[productId];
    let product_price = document.getElementsByClassName("price")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);

    input_quantity.value = current_quantity + 1;
    
    if (input_quantity.value >= 10) {
        product_price.innerHTML = "Rs. " + qty_price;
    }
}
const decrement_value = (productId) => {
    const input_quantity = document.getElementsByClassName("input")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);
    input_quantity.value = current_quantity - 1;
}