const searchFunction = () => {
    const input = document.getElementById("bar");
    let filter = input.value.toLowerCase();
    const ul = document.getElementById("list_of_products");
    let li = document.getElementsByClassName('product_list_item');
    const productName = document.getElementsByClassName("product_name");
    for (let i=0;i<li.length;i++) {
        console.log(productName[i].innerHTML.toLowerCase().indexOf(filter))
        if(productName[i].innerHTML.toLowerCase().indexOf(filter) < 0) {
            li[i].style.display = 'none';
        } else {
            li[i].style.display='';
        }
    }
}