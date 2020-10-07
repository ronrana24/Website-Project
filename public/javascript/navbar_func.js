const navbar_btn = document.getElementById('navbar_btn');
const burger_top = document.getElementById('burger--top');
const burger_mid = document.getElementById('burger--mid');
const burger_bottom = document.getElementById('burger--bottom');
navbar_btn.addEventListener('click', () => {
    burger_top.classList.toggle('burger-icon--top-close');
    burger_mid.classList.toggle('burger-icon--mid-close');
    burger_bottom.classList.toggle('burger-icon--bottom-close');
});