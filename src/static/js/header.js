const user = document.querySelector('.user');
async function start(){
    await getUser(renderUser); 
}

start();

async function getUser(callback){
    fetch('/api/user/')
    .then(response => response.json())
    .then(callback)
    .catch(err => {
        console.log(err);
    })
}

function renderUser(data){

    let html =''
        if(data.name == undefined){
            html = `<a href="/login" style="color: #fff";>Đăng nhập</a>`;
        }
        else{
            html = `<button onclick="userFunction()">${data.name}</button>
            <div class="more-user" hidden>
                <ul>
                    <li><a href="/user/profile">Thông tin tài khoản</a></li>
                    <li><a class="log-out" style="color: #fff";>Đăng xuất</a></li>
                </ul>
            </div>`;
        }
    
    user.innerHTML = html;
    let x = document.cookie;
    if(x){
        logOutFunction();
    }
    
}

function userFunction(){
    const moreUser = document.querySelector('.more-user')
    moreUser.hidden = false;
}

function logOutFunction(){
    const logOut = document.querySelector('.log-out');
    logOut.addEventListener('click', function(){
        deleteCookie("token");
        window.location.href = "/";
    })
}

function deleteCookie(name){
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

