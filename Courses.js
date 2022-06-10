const mongoose = require('mongoose');
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name : {type: String,
            required: true},
    id : {type: String,
        required: true},
    instructor : {type : String,
        required: true},
    // course duration in hours   
    duration : {type: Number,
        required: true},
    difficulty : {type: Number,
        required: true}
})

module.exports = mongoose.model('courses',courseSchema);