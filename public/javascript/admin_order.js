const searchName = () => {
    const customer_info = document.getElementsByClassName("customer_info");
    // console.log(customer_info)
    for (row in customer_info) {
        console.log(customer_info[row]);
            td = customer_info[row].getElementsByTagName("td");
            console.log(td);
    }
}