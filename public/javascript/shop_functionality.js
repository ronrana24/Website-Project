function increment_value(productId) {
    let input_quatity = document.getElementsByClassName("input")[productId].innerHTML;
    document.getElementsByClassName("input")[productId].innerHTML = input_quatity + 1;
}