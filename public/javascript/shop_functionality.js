function increment_value(productId, qty_price) {
    const input_quantity = document.getElementsByClassName("input")[productId];
    const decrement_value_btn = document.getElementsByClassName("decrease_quantity")[productId]
    let product_price = document.getElementsByClassName("price")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);

    if ($(decrement_value_btn).is(":disabled")) {
        $(decrement_value_btn).prop("disabled", false);
    }

    input_quantity.value = current_quantity + 1;
    
    if (input_quantity.value >= 10) {
        product_price.innerHTML = "Rs. " + qty_price;
    }
}
const decrement_value = (productId) => {
    const input_quantity = document.getElementsByClassName("input")[productId];
    const decrement_value_btn = document.getElementsByClassName("decrease_quantity")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);
    if (current_quantity === 1) {
        $(decrement_value_btn).prop('disabled', true);
    } else {
        input_quantity.value = current_quantity - 1;
    }
}