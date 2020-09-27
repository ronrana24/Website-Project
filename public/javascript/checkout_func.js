const toggleCartDetails = () => {
    const cartDetails = document.getElementById('order-summary');

    cartDetails.classList.toggle('order-summary--is-collapsed');
    cartDetails.classList.add('order-summary--transition');
    // cartDetails.classList.remove('order-summary--transition');
    cartDetails.classList.toggle('order-summary--is-expanded');
}

const addDeliveryForm = () => {
    const deliveryForm_Element = document.getElementById('delivery_form');
    deliveryForm_Element.classList.toggle('delivery_form');
}

const addPayButton = () => {
    const payNow_Element = document.getElementById('pay_now');
    const placeOrder_Element = document.getElementById('continue_button');
    payNow_Element.classList.toggle('displayBtn');
    placeOrder_Element.classList.toggle('displayBtn');
}