const month = document.getElementById('month');
const year = document.getElementById('year');
const row = document.getElementsByTagName('tr');
const user_name = document.getElementsByClassName("name");
const dop = document.getElementsByClassName('dop');

const searchName = () => {

    const input = document.getElementById('myInput');
    const inputValue = input.value.trim().toLowerCase();

    
    for(let i=0;i<user_name.length;i++) {
        const name = user_name[i].innerHTML.trim().toLowerCase(); 
        
        if(name.indexOf(inputValue) < 0) {
            row[i+1].style.visibility = 'collapse';
        } else {
            row[i+1].style.visibility = 'visible';
        }
    }
}

const filter = () => {
    console.log(month.value + " " + year.value);
    const monthValue = month.value.trim();
    const yearValue = year.value.trim();
    if (monthValue === 'hide' && yearValue === 'hide') {
        console.log("ERROR");
        return;
    }
    for(let i=0;i<dop.length;i++) {
        const dateofpurchase = dop[i].innerHTML.trim();
        if (monthValue === 'hide') {
            if(dateofpurchase.indexOf(yearValue) < 0) {
                row[i+1].style.visibility = 'collapse';
            } else {
                row[i+1].style.visibility = 'visible';
            }
        } else if(yearValue === 'hide') {
            if (dateofpurchase.indexOf("/"+monthValue+"/") < 0) {
                row[i+1].style.visibility = 'collapse';
            } else {
                row[i+1].style.visibility = 'visible';
            }
        } else {
            if (dateofpurchase.indexOf(yearValue+"/"+monthValue+"/") < 0) {
                row[i+1].style.visibility = 'collapse';
            } else {
                row[i+1].style.visibility = 'visible';
            }
        }
    }
}




