const express = require('express');
const { verifyToken } = require('../routes/verifyToken');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.render('thong-tin-tai-khoan.ejs')
})


module.exports = router;