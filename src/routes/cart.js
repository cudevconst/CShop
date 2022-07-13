const expess = require('express')
const router = expess.Router();
const User = require('../models/User');
const Cart = require('../models/Cart');

router.get("/",test, (req, res, next) => {
    Cart.find({userID: req.userID})
    .then(data => {
        data.forEach(e => {
            console.log(e);
        })
    })
    
})


//MiddleWare
async function test(req, res, next){
    var userID = req.query.user;
    const user = await User.findById({_id: userID})
    
    if(user){
        req.userID = userID;
        next();
    }
    else{
        res.status(403).json('Not Found')
    } 
}
module.exports = router;
