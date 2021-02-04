const serachBar = document.getElementById('search');
// const searchIcon = document.getElementById('searchIcon');
const pdtName = document.getElementsByClassName('pdtName');
const pdtPrice = document.getElementsByClassName('product_price');
const priceFrom = document.getElementById('from');
const priceTo = document.getElementById('to');
const under50 = document.getElementById('under50');
const p50150 = document.getElementById('50150');
const p150250 = document.getElementById('150250');
const p250300 = document.getElementById('250300');
const above300 = document.getElementById('300above');
const pdt = document.getElementsByClassName('pdt');
const priceElement = document.getElementById('price-input');
const outOfStock_checkbox = document.getElementById('out_of_stock');
const limited_checkbox = document.getElementById('limited');
const inStock_checkbox = document.getElementById('in_stock');
const outOfStock_Div = document.getElementsByClassName('oos');
const limit_Div = document.getElementsByClassName('limit');

// FOR SEARCH BAR
serachBar.addEventListener('keyup', () => {
    let filter = serachBar.value.toLowerCase().trim();
    console.log(filter);
    console.log(pdt);
    for (let i=0;i<pdt.length;i++) {
        const name = pdtName[i].querySelector('h5').innerHTML; 
        console.log(name);
        if(name.toLowerCase().indexOf(filter) < 0) {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
});

under50.addEventListener('click', () => {
    
    for (let i=0;i<pdt.length;i++) {
        const price = parseInt(pdtPrice[i].innerHTML.substring(1));
        if(parseInt(price) > 50 && pdt[i].style.display !== "none") {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
})
p50150.addEventListener('click', () => {
    
    for (let i=0;i<pdt.length;i++) {
        const price = parseInt(pdtPrice[i].innerHTML.substring(1));
        if(parseInt(price) <= 50 || price > 150) {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
})
p150250.addEventListener('click', () => {
    
    for (let i=0;i<pdt.length;i++) {
        const price = parseInt(pdtPrice[i].innerHTML.substring(1));
        if(parseInt(price) <= 150 || price > 250) {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
})
p250300.addEventListener('click', () => {
    
    for (let i=0;i<pdt.length;i++) {
        const price = parseInt(pdtPrice[i].innerHTML.substring(1));
        if(parseInt(price) <= 250 || price > 300) {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
})
above300.addEventListener('click', () => {
    
    for (let i=0;i<pdt.length;i++) {
        const price = parseInt(pdtPrice[i].innerHTML.substring(1));
        if(parseInt(price) < 300) {
            pdt[i].style.display = 'none';
        } else {
            pdt[i].style.display='';
        }
    }
})
