const expess = require('express');
const router = expess.Router();
const Product = require('../models/Products');
router.get("/", (req, res) => {
    console.log("HOme")
})

router.get("/:id", (req, res) => {
    return res.render("product-detail")
})


module.exports = router;