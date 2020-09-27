const increment_value = (productId, priceForSinglePiece, qunatityPrice, cartLength) => {
    // ELEMENTS
    const inputQuantity_Element = document.getElementsByClassName("input")[productId];
    const decreaseValue_Btn = document.getElementsByClassName("decrease_quantity")[productId];
    const productPrice_Element = document.getElementsByClassName("price")[productId];
    const totalCartPrice_Element = document.getElementById("total");


    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);

    // if decreaseValue button is disable --> Enable it.
    if ($(decreaseValue_Btn).is(":disabled")) {
        $(decreaseValue_Btn).prop("disabled", false);
    }

    inputQuantity_Element.value = current_quantity + 1;
    const inputQuantity = inputQuantity_Element.value;

    // if quantity is above or equal to threshold change selling price to quantity_price
    if (inputQuantity_Element.value >= 10) {
        productPrice_Element.innerHTML = (qunatityPrice*inputQuantity);
    } else {
        productPrice_Element.innerHTML = (inputQuantity*priceForSinglePiece);
    }

    let price = 0;
    for(let i=0;i<cartLength;i++) {
        const productPrice = parseInt(document.getElementsByClassName('price')[i].innerHTML);
        price += productPrice;
    }
    console.log(price);

    totalCartPrice_Element.innerHTML = "&#8360; " + price;
        
}
const decrement_value = (productId, priceForSinglePiece, qunatityPrice, cartLength) => {
    const inputQuantity_Element = document.getElementsByClassName("input")[productId];
    const decrementValue_Btn = document.getElementsByClassName("decrease_quantity")[productId];
    const productPrice_Element = document.getElementsByClassName("price")[productId];
    const totalCartPrice_Element = document.getElementById("total");

    
    let current_quantity = parseInt(document.getElementsByClassName("input")[productId].value);


    if (current_quantity === 1) {
        $(decrementValue_Btn).prop('disabled', true);
    } else {
        inputQuantity_Element.value = current_quantity - 1;

        if (inputQuantity_Element.value < 10) {
            productPrice_Element.innerHTML = (priceForSinglePiece*inputQuantity_Element.value);
        } else {
            productPrice_Element.innerHTML = (qunatityPrice*inputQuantity_Element.value);
        }
    }

    let price = 0;
    for(let i=0;i<cartLength;i++) {
        const productPrice = parseInt(document.getElementsByClassName('price')[i].innerHTML);
        price += productPrice;
    }
    console.log(price);

    totalCartPrice_Element.innerHTML = "&#8360; " + price;
}
