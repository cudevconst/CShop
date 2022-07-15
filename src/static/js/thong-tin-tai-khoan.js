console.log(1);
const changeInfo = document.getElementById('change-info');
const change = document.querySelectorAll('.change')
const btnChange = document.querySelector('.btn-change');
changeInfo.addEventListener('click', function(){
    change.forEach(e => {
        e.removeAttribute('disabled');
        e.style.cursor = 'context-menu'
    })
    changeInfo.hidden = true;
    btnChange.hidden = false;
})