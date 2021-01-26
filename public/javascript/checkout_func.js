const form = document.getElementsByTagName('form')[0];
const business_name = document.getElementById('business_name');
const deliver_or_not = document.getElementById('delivery');

form.addEventListener('submit', (e) => {
    
    
    checkInputs();

});



const checkInput = () => {
    const nameValue = business_name.value.trim();
    // const
    // if (nameValue.length === "") {
    //     setErrorFor(input)
    // }
}





const toggleCartDetails = () => {
    const cartDetails = document.getElementById('order-summary');

    cartDetails.classList.toggle('order-summary--is-collapsed');
    cartDetails.classList.add('order-summary--transition');
    // cartDetails.classList.remove('order-summary--transition');
    cartDetails.classList.toggle('order-summary--is-expanded');
}

const addDeliveryForm = () => {
    const deliveryForm_Element = document.getElementById('delivery_form');
    const time_Element = document.getElementById('time');
    deliveryForm_Element.classList.toggle('delivery_form');
    time_Element.classList.toggle('displayBtn');
    console.log(deliver_or_not.value)
}

const addPayButton = () => {
    const payNow_Element = document.getElementById('pay_now');
    const placeOrder_Element = document.getElementById('continue_button');
    payNow_Element.classList.toggle('displayBtn');
    placeOrder_Element.classList.toggle('displayBtn');
}