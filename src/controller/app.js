const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');


router.get('/', (req, res) => {
    req.flash('username', req.session.username);
    const username = req.session.username;
    return res.render('index', {username});
    
})

router.get('/register', (req, res) => {
    const username = req.flash('username');
    res.render('dang-ky', {username});
})

router.get('/login', (req, res, next) => {

    const err = req.flash('err')
    return res.render('login', {err});

})

router.get("/forgot-password",(req, res) => {
    return res.render('quen-mk.ejs');
})

router.post('/login', async (req, res) => {
    // const {username, password} = req.body;

    // const user = await UserModel.findOne({username: username});
    // if(user){
    //     if(user.password == password){
            
    //         req.session.username = username;
    //         req.flash('username', username);
            
    //         res.redirect('/')
            
    //     }
    //     else{
            
    //         req.flash('err', "Invalid username or password")
            
    //         return  res.redirect('/login');
                
    //     }
    // }
    // else{
    //     res.locals.err = "Invalid username or password";
    //     return res.render('login'), {
    //         err,
    //     }
    // }
})
module.exports = router;