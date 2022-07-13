const apiTP = 'https://provinces.open-api.vn/api/';
const apiD = 'https://provinces.open-api.vn/api/d/';
var codeTP = 1
var codeQ = 1
var codeP = 1
var nameTP = '';
var nameQuan = '';
var namePhuong = ''
start();
async function start(){
    await getDataTP(renderDataTP);
    tp.onchange=showtp;
    quans.onchange=showq;
    phuongs.onchange=showp;
    await getDataD(renderDataD);
    await getDataP(renderDataP);
}
async function getDataTP(callback){
    fetch(apiTP)
    .then(response => response.json())
    .then(callback)
}

function renderDataTP(datas){
    
    const tp = document.querySelector('.select-tp')
    let index = 1;
    var html = datas.map(function(data){
        if(index == 1){
            index = 2;
            return `<option selected="selected" value="${data.code}">${data.name}</option>`;
        }
        else{
            return `<option value="${data.code}">${data.name}</option>`;
        }
    })
    tp.innerHTML = html.join(' ');
    getCodeTP();
}


async function getDataD(callback){
    fetch('https://provinces.open-api.vn/api/d/')
    .then(response => response.json())
    .then(callback)
}

function renderDataD(datas){
    const selectD = document.querySelector('.select-q')
    var district = []
    let index = 1;
    var html = datas.map(function(data){
        if(data.province_code == codeTP){
            district.push(data);
            if(index == 1){
                index = 2;
                return `<option selected="selected" value="${data.code}">${data.name}</option>`;
            }
            else{
                return `<option value="${data.code}">${data.name}</option>`;
                
            }
        }
    })
    selectD.innerHTML = html.join(' ');
    getCodeQ();
}

async function getDataP(callback){
    fetch('https://provinces.open-api.vn/api/w/')
    .then(response => response.json())
    .then(callback)
}

function renderDataP(datas){

    const selectD = document.querySelector('.select-p')
    var quan = []
    var html = datas.map(function(data){
        if(data.district_code  == codeQ){
            quan.push(data);
            return `<option value="${data.code}">${data.name}</option>`;
        }
    })
    selectD.innerHTML = html.join(' ');
    getCodeP();
    
}

var tp = document.querySelector('.select-tp')
function showtp(){
  getCodeTP();
  getDataD(renderDataD)
  getDataP(renderDataP)

  
}



var quans = document.querySelector('.select-q')
function showq(){
  getCodeQ();
  getDataP(renderDataP)
}

var phuongs = document.querySelector('.select-p')
function showp(){
    getCodeP();
    
}

function getCodeTP(){
    let thanhPho = tp.options[tp.selectedIndex].value;
    nameTP = tp.options[tp.selectedIndex].text;
    codeTP = Number(thanhPho);
    console.log(nameTP);
}
function getCodeQ(){
    let quan = quans.options[quans.selectedIndex].value;
    nameQuan = quans.options[quans.selectedIndex].text;
    codeQ = Number(quan);
    console.log(nameQuan)
}


function getCodeP(){
    namePhuong = phuongs.options[phuongs.selectedIndex].text;
    console.log(namePhuong);
}

function myFunction(){
    // console.log(nameTP, nameQuan, namePhuong)

    
    let data = {
        username: document.getElementById('user-name').value,
        password: document.getElementById('password').value,
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        address: namePhuong + ", " + nameQuan + ", " + nameTP,
    }
        fetch("/api/auth/register",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => getMessageLogin(data))
    .catch(function(res){ console.log(res) })

}

function getMessageLogin(datas){
    console.log(datas);
    if(!datas.data){
        let message = document.getElementById('message');
        message.classList.remove('d-none');
        message.classList.add('d-block');
        
    }
    else{
        console.log('aaa')
        window.location.href = "/login"
    }
}






