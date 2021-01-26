// validate the inputs then give POST response at /login/shop/rana_disposal
const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    if (!checkInputs()) {
        e.preventDefault();
    }
});


const checkInputs = () => {
   const usernameValue = username.value.trim();
   const passwordValue = password.value.trim();
   let pass = false;
   let user = false;
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
   if (user && pass) {
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