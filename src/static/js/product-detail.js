const productId = sessionStorage.getItem('productId');
console.log(productId);

const product_detail_api = 'http://localhost:3000/api/product/' + productId

var pickSize='';
var pickColor='';
function start(){
    getProductById(renderProduct);
}
start();

function getProductById(callback){
    fetch(product_detail_api)
    .then(response => response.json())
    .then(callback)
}

function renderProduct(data){
    const product = document.querySelector('.container-fliud')
    let html = `<div class="wrapper row">
    <div class="preview col-md-6">
        
        <div class="preview-pic tab-content">
          <div class="tab-pane active" id="pic-1"><img src="/image/${data.img}" style="width:400px;"/></div>
        </div>
        
    </div>
    <div class="details col-md-6 mt-5">
        
        <h3 class="name-product">${data.name}</h2>
        
        <h4 class="price">Giá: <span style="color: red;">${renderMoney(data.price)}</span></h4>
        
        <h5 class="sizes">size:
            ${renderSize(data.size)}
            
        </h5>
        <h5 class="colors ">color:
            ${renderColor(data.color)}
        </h5>
        <div class="pick-product mb-3"></div>
        <div class="action" hidden>
            <a href="/cart"><button class="add-to-cart btn btn-default" type="button">thêm vào giỏ hàng</button></a>
            
        </div>
    </div>
    </div>`;
    product.innerHTML = html;
    activeSize();
    activeColor();
    
    
}

function renderSize(data){
    let html = data.map(e => {
        return `<button type="button" class="btn btn-outline-secondary size" ">${e}</button> `;
    })
    return html.join(' ')
}

function renderColor(data){
    let html = data.map(e => {
        return `<button type="button" class="btn btn-outline-secondary color active" value="${e}" style="background-color: ${e}; height:40px; width:40px;"></button> `
    })
    return html.join(' ');
}
function activeSize(){
    const size = document.querySelectorAll('.size');
    size.forEach(e => {
        
        e.addEventListener('click', () => {
            const sizeActive = document.querySelector('.sizes>.active');
            
            if(sizeActive){
                sizeActive.classList.remove('active');
            }
            e.classList.add('active');
            pickSize = e.innerHTML;
            pickProduct();
           
        })

    })
}

function activeColor(){
    const color = document.querySelectorAll('.color');
    color.forEach(e => {
        
        e.addEventListener('click', () => {
            const sizeActive = document.querySelector('.color>.active');
            console.log(sizeActive);
            if(sizeActive){
                sizeActive.classList.remove('active');
            }
            e.classList.add('active');
            pickColor = e.value
            pickProduct();
            
        })
    })
}

function pickProduct(){
    
    if(pickColor && pickSize){
        const pick = document.querySelector('.pick-product');
        let html = `<span>Size: ${pickSize}, Color: ${pickColor}</span>`
        pick.innerHTML = html;
        document.querySelector('.action').hidden = false;

    }
    
    
}
function renderMoney(money){
    return money.toLocaleString('it-IT', {style : 'currency', currency: "VND"});
}