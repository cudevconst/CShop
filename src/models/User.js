// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema(
//     {
//         username:{type: String, required: true, unique: true, backgroud: true},
//         email:{type: String, required: true, unique: true, backgroud: true},
//         password:{type: String, required: true, backgroud: true},
//         isAdmin:{
//             type: Boolean,
//             default: false,
//         },
//     },{timestamps: true}
// )

// module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{type: String, unique: true, },
    password:{type: String,},
    name:{type: String,},
    address:{type: String,},
    email:{type: String,},
    role:{type: String, default: 'ROLE_USER'},

})

module.exports = mongoose.model("User", userSchema);

