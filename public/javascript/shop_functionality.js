function increment_value(productId, qty_price, threshold) {
    const input_quantity = document.getElementsByClassName("input")[productId];
    const decrement_value_btn = document.getElementsByClassName("decrease_quantity")[productId];
    const actualPrice = document.getElementsByClassName("actualPrice")[productId];
    const quantityPrice = document.getElementsByClassName("quntityPrice")[productId];
    let product_price = document.getElementsByClassName("price")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);

    if ($(decrement_value_btn).is(":disabled")) {
        $(decrement_value_btn).prop("disabled", false);
    }

    input_quantity.value = current_quantity + 1;
    
    if (input_quantity.value >= threshold) {
        actualPrice.classList.add("qtyPrice");
        quantityPrice.style.display = ""
    }
}
const decrement_value = (productId) => {
    const input_quantity = document.getElementsByClassName("input")[productId];
    const decrement_value_btn = document.getElementsByClassName("decrease_quantity")[productId];
    const actualPrice = document.getElementsByClassName("actualPrice")[productId];
    const quantityPrice = document.getElementsByClassName("quntityPrice")[productId];
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);
    if (current_quantity === 1) {
        $(decrement_value_btn).prop('disabled', true);
    } else {
        input_quantity.value = current_quantity - 1;
        if (input_quantity.value < 10) {
            actualPrice.classList.remove("qtyPrice");
            quantityPrice.style.display = 'none';
        }
    }
}