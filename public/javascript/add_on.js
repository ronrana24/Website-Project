const form = document.querySelector('form');
const product_name = document.getElementById('product_name');
const product_price = document.getElementById('product_price');
const product_quantity = document.getElementById('product_quantity');
const product_quantityPrice = document.getElementById('quantityPrice');
const prodct_thresholdQuantity = document.getElementById('thresholdQuantity');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkInputs()) {
        
    }

});

const checkInputs = () => {
    const nameValue = product_name.value.trim();
    const priceValue = product_price.value.trim();
    const quantityValue = product_quantity.value.trim();
    const quantityPriceValue = product_quantityPrice.value.trim();
    const thresholdQuantityValue = prodct_thresholdQuantity.value.trim();

    let name, price, quantity = false;

    if (nameValue === '') {
        setErrorFor(product_name, "Product name not given");
    } else {
        setSuccessFor(product_name);
        name = true;
    }

    if (priceValue === '') {
        setErrorFor(product_price, "Price of product is not mentioned");
    } else if (priceValue === '0') {
        setErrorFor(product_price, "Price of product cannot be \'0\'");
    } else {
        setSuccessFor(product_price);
        price = true;
    }

    if (quantityValue === '') {
        setErrorFor(product_quantity, "Quantity of product is not mentioned");
    } else if (quantityValue === '0') {
        setErrorFor(product_quantity, "Quantity of product cannot be \'0\'");
    } else {
        setSuccessFor(product_quantity);
        quantity = true;
    }
    

    if (name && price && quantity) {
        return true;
    } else {
        return false;
    }

}


const setErrorFor = (input, message) => {
    const input_group = input.parentElement;
    const input_div = input_group.parentElement;
    
    const label = input_div.querySelector('label');
    
    const intput = input_group.querySelector('input');

    label.style.color = 'rgb(170, 2, 2)';
    intput.classList.add('error');
}

const setSuccessFor = (input) => {
    const input_group = input.parentElement;
    const intput = input_group.querySelector('input');

    intput.classList.add('success');

    // rgb(7, 145, 7)
}