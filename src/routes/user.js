const expess = require('express');
const { verifyToken } = require('./verifyToken');
const router = expess.Router();
const User = require('../models/User');
router.get('/', verifyToken, (req, res) => {
    const userId = req.userId;
    console.log(userId);
    User.find({_id: userId})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json();
    })
    
    
})

router.patch("/patch", verifyToken,(req, res, next)=>{
        const email = req.body.email;
        User.findOne({email: email})
        .then(data => {
            if(!data){
                next();
            }
            else{
                res.json({
                    message: "Email đã được đăng ký",
                })
            }
        })
        .catch(err => {
            res.status(500).json("Error")
        })
    }, (req, res, next) => {
        const userId = req.userId.id;
        const {name, address, email} = req.body;
        User.findByIdAndUpdate({_id: userId}, {
            $set : {name: name, address: address, email: email}
        })
        .then(data =>{
            res.json({
                message: "Cập nhật thành công",
            })
        })
        .catch(err => {
            res.status(500).json("Loi server");
        })
})

router.delete("/delete", verifyToken, (req, res, next) => {
    const userId = req.userId.id;
    User.remove({_id: userId}, (err, user) => {
        if(err){
            res.json("Loi server");
        }
        else{
            res.json({
                message: "Xóa tài khoản thành công",
            })
        }
    })

})
module.exports = router;