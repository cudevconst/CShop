const form = document.getElementById('form');
const message = document.querySelector('.message');
const email = document.getElementById('email');
const api = "/api/auth/forgot-pass"
form.addEventListener('submit', function(e){
    e.preventDefault();
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email.value})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status == 200){
            message.hidden = false;
        }
    })
})