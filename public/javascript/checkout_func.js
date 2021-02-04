const form = document.getElementsByTagName('form')[0];
const business_name = document.getElementById('business_name');
const deliver_or_not = document.getElementById('delivery');
const time = document.getElementById('time');
const firstName = document.getElementById('checkout_shipping_address_first_name');
const lastName = document.getElementById('checkout_shipping_address_last_name');
const mobileNumber = document.getElementById('mobileNumber');
const address = document.getElementById('checkout_shipping_address_address1');
const payNow_btn = document.getElementById('pay_now');
const placeOrder_btn = document.getElementById('continue_button');
const cartDetails = document.getElementById('order-summary');
const time_element = document.getElementById('time_element');
const paynow_or_not = document.getElementById('paynow_or_not');

form.addEventListener('submit', (e) => {
    // console.log(form.action);
    // if (!checkInputs()) {
    //     e.preventDefault();
    // }    

});



const checkInputs = () => {
    const business = business_name.value.trim();
    if (deliver_or_not.checked) {
        const firstName_value = firstName.value.trim();
        const lastName_value = lastName.value.trim();
        const mobileNumber_value = mobileNumber.value.trim();
        const address_value = address.value.trim();
        if (checkAddress(address_value) && checkMobileNumber(mobileNumber_value) && checkNames(lastName_value) && checkNames(firstName_value) && checkNames(business)) {
            return true;
        }
        if(!checkAddress(address_value)) {
            setError(address, "Address is not mentioned");
        }
        if (!checkMobileNumber(mobileNumber_value)) {
            if(mobileNumber_value.length === 0) {
                setError(mobileNumber, "Mobile Numeber is not mentioned");
            } else {
                setError(mobileNumber, "Mobile entered is incorrect");
            }
        }
        if(!checkNames(firstName_value)) {
            let message = "";
            if(firstName_value.length === 0) {
                message = "First Name is not mentioned";
            } else {
                message = "Enter correct First Name";
            }
            setError(firstName, message);
        }
        if (!checkNames(lastName_value)) {
            let message = "";
            if(lastName_value.length === 0) {
                message = "Last Name is not mentioned";
            } else {
                message = "Enter correct Last Name";
            }
            setError(lastName, message);
        }
        if (!checkNames(business)) {
            let message = "";
            if(business.length === 0) {
                message = "Your bussiness name is not mentioned";
            } else {
                message = "Enter correct Business Name";
            }
            setError(business, message);
        }
        return false;
    } else {
        const datetime = time.value.trim();
        if (checkNames(business) && checkDateTime(datetime)) {
            return true;
        } else {
            let message = "";
            if(business.length === 0) {
                message = "Your bussiness name is not mentioned";
            } else {
                message = "Enter correct Business Name";
            }
            setError(business, message);
            return false;
        }
    }
}

const checkDateTime = (datetime) => {
    const d = new Date();
    const currentDate = d.getDate()
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentTime = d.getTime();
    const date = datetime.substring(0, 10);
    console.log(date);
    const purchase_d = new Date(date);
    const purchaseDate = d.getDate()
    const purchaseYear = d.getFullYear();
    const purchaseMonth = d.getMonth();
    const purchaseTime = d.getTime();
    console.log(currentDate + " " + currentMonth + " " + currentTime + " " + currentYear);
    console.log(purchaseDate + " " + purchaseMonth + " " + purchaseTime + " " + purchaseYear);
    if (currentYear === purchaseYear && currentMonth === purchaseMonth && purchaseDate>= currentDate && purchaseTime > currentTime) {
        alert("True");
        return true;
    }
    alert("False");
    return false;
}

const checkAddress = (address) => {
    return address.length > 5; 
}

const checkNames = (name) => {
    return name.length >= 4; 
}

const checkMobileNumber = (mobileNumber) => {
    if (mobileNumber.length === 10) {
        return true;
    }
    return false;
}

const setError = (input, message) => {
    console.log(message);
}


const toggleCartDetails = () => {

    cartDetails.classList.toggle('order-summary--is-collapsed');
    cartDetails.classList.add('order-summary--transition');
    cartDetails.classList.toggle('order-summary--is-expanded');
}

const addDeliveryForm = () => {
    const deliveryForm_Element = document.getElementById('delivery_form');
    deliveryForm_Element.classList.toggle('delivery_form');
    time_element.classList.toggle('displayBtn');
    console.log(deliver_or_not.value)
}

const togglePayButton = () => {
    
    const pay_value = paynow_or_not.value.trim();
    const pay_value_option = paynow_or_not.querySelectorAll('option')[0];
    console.log(pay_value)
    if (pay_value !== "none") {
        pay_value_option.style.display = "none";
        if (pay_value === "Yes") {
            placeOrder_btn.classList.add('displayBtn');
            payNow_btn.classList.remove('displayBtn');
        } else {
            placeOrder_btn.classList.remove('displayBtn');
            payNow_btn.classList.add('displayBtn');
        }
    }
}
