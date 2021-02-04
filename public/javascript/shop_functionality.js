const increase = document.getElementsByClassName('increase_quantity');
const decrease = document.getElementsByClassName('decrease_quantity');
const price = document.getElementsByClassName('product_price');
const input = document.getElementsByClassName('input');

const increment_value = (index, quantity_price, threshold_quantity) => {
    const increase_btn = increase[index];
    const product_price = price[index];
    const input_quantity = input[index];
    const price_strongTag = product_price.querySelectorAll('strong');
    const price_disable = price_strongTag[1];
    const new_price = price_strongTag[0];
    const decrease_btn = decrease[index];
    const decrease_icon = decrease_btn.querySelector('path');
    let input_quantity_value = parseInt(input_quantity.value.trim());

    input_quantity_value += 1;
    if (decrease_btn.disabled) {
        decrease_btn.disabled = false;
        decrease_icon.style.fill = "#000";
    }
    if (input_quantity_value >= threshold_quantity) {
        price_disable.classList.add('price-disable');
        new_price.classList.add('new_price');
        new_price.innerHTML = "&#8377;" + quantity_price;
    }
    input_quantity.value = input_quantity_value;
}
const decrement_value = (index, p, threshold_quantity) => {
    const decrease_btn = decrease[index];
    const input_quantity = input[index];
    const product_price = price[index];
    const decrease_icon = decrease_btn.querySelector('path');
    const price_strongTag = product_price.querySelectorAll('strong');
    const price_disable = price_strongTag[1];
    const new_price = price_strongTag[0];
    let input_quantity_value = parseInt(input_quantity.value.trim());

    if (input_quantity_value == 1) {
        decrease_icon.style.fill =  "#d6d6d6";
        decrease_btn.disabled = true;
    }
    input_quantity_value -= 1;
    if (input_quantity_value < threshold_quantity) {
        price_disable.classList.remove('price-disable');
        new_price.classList.remove('new_price');
        new_price.innerHTML = "";
    }
    input_quantity.value = input_quantity_value;
}