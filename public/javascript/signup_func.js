const name = document.getElementById('name');
const username = document.getElementById('email');
const password = document.getElementById('pass');
const repassword = document.getElementById('re_pass');
const error = document.getElementById('error');

const checkValidation = () => {

    if (username.value === "") {
        username.classList.add('invalid');
    }
    if (password.value === "") {
        password.classList.add('invalid');
    }
    if (name.value === "") {
        name.classList.add('invalid');
    }
    if (repassword.value === "") {
        repassword.classList.add('invalid');
    }
}

const removeError = () => {
    if (username.value !== "") {
        username.classList.remove('invalid');
    }
    if (password.value !== "") {
        password.classList.remove('invalid');
    }
    if (repassword.value !== "") {
        repassword.classList.remove('invalid');
    }
    if (name.value !== "") {
        name.classList.remove('invalid');
    }
}

const checkPassword = () => {
    if(repassword.value !== password.value) {
        error.innerHTML = "Incorrect Password"
    } else {
        error.innerHTML = ""
    }
}