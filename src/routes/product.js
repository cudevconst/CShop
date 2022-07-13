const expess = require('express');
const multer = require('multer');
const testUtils = require('../utils/name_file');
const Product = require('../models/Products');
const Fuse = require('fuse.js');
const router = expess.Router();


// cau hinh multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/image')
    },
    filename: function (req, file, cb) {
      cb(null, testUtils.renameFile(file.originalname))
    }
  })
var upload = multer({ storage: storage })


router.get('/search',async (req, res) => {
    var {name} = req.query;
    const product = await Product.find();
    const fuse = new Fuse(product, {
        keys:['name']
    })
    const result = fuse.search(name);
    const products = []
    result.forEach(e => {
        products.push(e.item);
    })
    res.json(products)
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Product.findById({_id: id})
    .exec((err, product) => {
        if(err) 
            return res.status(404);
        try{
            res.json(product);
        }
        catch(error){
            console.log(err);
        }
    })
   
})

router.get('/', async (req, res) => {
    const products = await Product.find();
  
    res.json(products);
    
})







router.post('/upload', upload.single('img'), async (req, res) => {
    // res.json(req.file.filename)
    const formData = req.body;
    const product = new Product({
        name: formData.name,
        img: req.file.filename,
        categories: changInputToArray(formData.categories),
        size: changInputToArray(formData.size),
        color: changInputToArray(formData.color),
        price: formData.price,
    })
    try{
        const productSave = await product.save();
        res.json(productSave);
    }catch(err){
        res.json(err);
    }

})



function changInputToArray(input){
    return input.split(",");
}
module.exports = router;