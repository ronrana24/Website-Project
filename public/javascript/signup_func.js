// validate the inputs then give POST response at /login/shop/rana_disposal
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const password = document.getElementById('pass');
const confirm_password = document.getElementById('re_pass');
const customerName = document.getElementById('name');

form.addEventListener('submit', (e) => {
    

    if (!checkInputs()) {
        e.preventDefault();
    }
    
});

const checkInputs = () => {
   const usernameValue = username.value.trim();
   const passwordValue = password.value.trim();
   const nameValue = customerName.value.trim();
   const confirm_password_value = confirm_password.value.trim();

   let user = false;
   let pass = false;
   let name = false;
   let cpass = false;

   if(nameValue === '') {
       setErrorFor(customerName, "Name not given");
   } else if (nameValue.length < 4) {
       setErrorFor(customerName, "Enter correct Name");
   } else {
       setSuccessFor(customerName);
       name = true;
   }

   if(usernameValue === '') {
       setErrorFor(username, "Username cannot be blank");
   } else if (usernameValue.length < 3) {
        setErrorFor(username, "Enter correct username");
   } else {
       setSuccessFor(username);
       user = true;
   }

   if (passwordValue === '') {
       setErrorFor(password, "Password cannot be blank");
   } else if(passwordValue.length < 5) {
       setErrorFor(password, "Password length is too short");
   } else {
       setSuccessFor(password);
       pass = true
   }

   if (confirm_password_value === '') {
    setErrorFor(confirm_password, "Re-write your password");
    } else if(passwordValue.length < 5) {
        setErrorFor(confirm_password, "Password length is too short");
    } else if (!checkPassword(passwordValue, confirm_password_value)) {
        setErrorFor(confirm_password, "Password does not match");
    }
    else {
        setSuccessFor(password);
        cpass = true;
    }
    if (user && pass && name && cpass) {
        return true;
    } else {
        return false;
    }
}


const checkPassword = (pass, re_pass) => {
    if (pass === re_pass) {
        return true;
    } else {
        return false;
    }
}


const setErrorFor = (input, message) => {
    const form_group = input.parentElement;
    const icon = form_group.querySelector('i');

    const para = form_group.querySelector('p');

    // show error
    para.style.display = 'block'
    para.innerHTML = message;

    // add error class
    para.style.color = 'rgb(170, 2, 2)';
    icon.style.color = 'rgb(170, 2, 2)';
    

}

const setSuccessFor = (input) => {
    const form_group = input.parentElement;
    const icon = form_group.querySelector('i');
    const para = form_group.querySelector('p');

    icon.style.color = ' rgb(7, 145, 7)';
    para.style.display = 'none'
}