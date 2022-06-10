const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const materialSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    type : {type: String,
        required: true},
    link : {type : String,
            required: true}
})

module.exports = mongoose.model('materials',materialSchema);