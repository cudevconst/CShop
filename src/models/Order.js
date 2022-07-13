
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userID: {type: String,},
    products: [
        {
            productID: {type: String,},
            quantity: {type: Number, default: 1,},
        }
    ],
    amout: {type: Number,},
    address: {type: Object,},
    status: {type: String, default: "pending"}
})

module.exports = mongoose.model("Product", OrderSchema);