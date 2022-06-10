const mongoose = require('mongoose');
const schema = mongoose.Schema;

// User Schema
const userSchema = new schema({
    name : {type: String, 
        required:true},
    // true = Admin    
    role : {type: Boolean,
        required: true,
    },
    age : {type: Number,
        required: true},
    gender : {type: String,
        required: true},
    username: {type: String,
        required: true},
    password : {type: String,
        required: true},
    email : {type: String,
        required: true},
    date : {type: Date,
        default: Date.now()}
});
module.exports = mongoose.model('users',userSchema);