const expess = require('express');
const {authCart} = require('../middleware/CartMW');
const router = expess.Router();
const {verifyToken} = require('../routes/verifyToken')

router.get("/", authCart ,(req, res) => {
    res.render('gio-hang.ejs');
    
})
module.exports = router