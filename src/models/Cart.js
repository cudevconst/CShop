
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userID: {type: String,},
    products: [
        {
            productID: {type: String,},
            quantity: {type: Number, default: 1,},
        }
    ]
    
})

module.exports = mongoose.model("Cart", CartSchema);