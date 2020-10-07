const searchFunction = () => {
    const input = document.getElementById("bar");
    console.log(input.value);
    let filter = input.value.toLowerCase();
    const ul = document.getElementById("list_of_products");
    let li = document.getElementsByTagName('li');
    const productName = document.getElementsByClassName("product_name");
    for (let i=0;i<li.length;i++) {
        if (productName[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = 'none';
        }
    }
}