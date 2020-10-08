const username = document.getElementById('your_name');
const password = document.getElementById('your_pass');

const checkValidation = () => {
    if (username.value === "" || password.value === "") {
        if (username.value === "" && password.value === "") {
            username.classList.add('invalid');
            shakeInputField(username);
            password.classList.add('invalid');
            shakeInputField(password);
        } else if(password.value === "") {
            password.classList.add('invalid');
            shakeInputField(password);
        } else {
            username.classList.add('invalid');
            shakeInputField(username);
        }
    } else {
       
    }
}

const removeError = () => {
    if (username.value !== "") {
        username.classList.remove('invalid');
    }
    if (password.value !== "") {
        password.classList.remove('invalid');
    }
}

const shakeInputField = (element) => {
    element.style.animation = "shake 0.5s";
}