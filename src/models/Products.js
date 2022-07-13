
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String,},
    img: { type: String,},
    categories: { type: Array,},
    size: { type: Array,},
    color: { type: Array,},
    price: { type: Number,},
    
})

module.exports = mongoose.model("Product", ProductSchema);