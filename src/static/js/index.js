const allProductApi = '/api/product';
const searchProductApi = '/api/product/search?name='
async function start(){
    await getAllProduct(allProductApi, renderProduct);
    
}

start();


async function getAllProduct(api, callback){
    fetch(api)
    .then(response => response.json())
    .then(callback);
}

function renderProduct(datas){
    const products = document.querySelector('.products');
    const htmls = datas.map(data => {
        return `<div class="col-3 mt-3 ">
        
        <div class="card text-center " style="width: 100%;">
        
            <img class="product" src="/image/${data.img}" product="${data._id}">
            <div class="card-body">
                <h5 class="card-title" style="text-align: center;">${data.name}</h5>
                <span class="mb-4" style="text-align: center; color: red; display: block">${renderMoney(data.price)}</span>
                
            </div>
            </div>
        
        </div>     `;
    })
    products.innerHTML = htmls.join(' ');
    getProduct();
}

function renderMoney(money){
    return money.toLocaleString('it-IT', {style : 'currency', currency: "VND"});
}

function getProduct(){
    const product = document.querySelectorAll('.product');
    product.forEach(e => {
        e.addEventListener('click', () => {
            window.location.href = "/product/" + e.getAttribute('product');
            sessionStorage.setItem('productId', e.getAttribute('product'));
        })
       
    })
    
}
const search = document.getElementById('search')
const btnSearch = document.getElementById('btnSearch')

search.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnSearch.click();
  }
});
btnSearch.addEventListener('click', async function(){
    if(!search.value){
        await getAllProduct(allProductApi, renderProduct);
    }
    else{
        await getAllProduct(searchProductApi + search.value, renderProduct);
    }
})


