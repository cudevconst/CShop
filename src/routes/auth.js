
const express = require("express");
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');

//Dang ky

router.post('/register',(req, res, next) =>{
    const {username, email} = req.body;
    User.find({$or: [{username: username}, {email: email}]}, (err, user) => {
        if(err){
            res.status(500).json("Error");
        }
        if(!user.length){
            next();
        }
        else{
            res.json({
                message: "Tài khoản đã tồn tại",
            })
        }
    })
    

}
, async (req, res) => {
    const { username, password, name, address, email} = req.body
    const user = new User({
        username: username,
        password: password,
        name: name,
        address: address,
        email: email,

    });
    const userSave = await user.save();
        return res.json({
            msg: "Tạo tài khoản thành công",
            data: userSave,
        });
    }
    
)

// Dang nhap

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    User.findOne({
        username: username,
        password: password,
    })
    .then(data => {
        if(data){
            const token = jwt.sign({
                id: data._id
            }, 'mk');
            
            // set token ở phía server test
            res.cookie('token', token);
            
            return res.json({
                status: true,
                message: "Đăng nhập thành công",
                token: token,
            })
            
        }
        else{
            return res.json({
                status: false,
                message: "Đăng nhập thất bại",
            })
        }
    })
    .catch(err => {
        res.json({
            status: false,
            message: "Tài khoản không tồn tại"
        })
    })
})

router.post('/forgot-pass', async (req, res, next) => {
    const {email} = req.body;
    User.remove();
    const user = await User.findOne({email: email})
    try{
        transporter.sendMail(mailOptions(email, user), function(error, info){
            if (error) {
                res.status(500).json("Error")
            } else {
                res.json({
                    status: 200,
                    message: "Thành công"
                })
            }
        });
    }
    catch(err){
        res.status(500).json({
            status: 500,
            message: "Fail"
        })
    }
    console.log(user);
})
router.post('/test', (req, res) => {
    const {email} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(err){
            console.log(1);
        }
        else{
            console.log(user);
        }
    })

})

//mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cshopnvc@gmail.com',
      pass: 'clwdevjzcwcifzdn'
    }
  });
  
function mailOptions(email, user){
    let html = `<h3>Bạn đã quên mật khẩu</h3>
                <h4>Tên đăng nhập: ${user.username}</h4>
                <h4>Mật khẩu: ${user.password}</h4>
            `
    const info = {
    from: 'cshopnvc@gmail.com',
    to: email,
    subject: 'Cshop Forgot PassWord',
    html: html,
    }
    return info;
  };
  
  
module.exports = router;