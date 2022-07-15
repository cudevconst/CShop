const form = document.getElementById('form')
form.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {
        username: username,
        password: password,
    }
    login(data);
    
})

function login(data){
    let api = "/api/auth/login";
    fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),

    })
    .then(response => response.json())
    .then(data => {
        if(data.status){
            createCookie("token", data.token, 10);
            window.location.href = "/";
            
            
        }
        else{
            const message = document.querySelector('.message');
            message.hidden = false;
        } 
    })
}

function createCookie(name,value,minutes) {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}







