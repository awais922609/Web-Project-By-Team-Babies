const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assessmemtSchema = new Schema({
    id : {type : String,
        required: true},
    name : {
        type: String,
        required: true
    },
    questions :[{
        statement: {
            type:String,
            required:true
        },
        option1 : {
            type: String,
            required: true
        },
        option2 : {
            type: String,
            required: true
        },
        option3 : {
            type: String,
            required: true
        },
        option4 : {
            type: String,
            required: true
        },
        answer : {
            type: Number,
            required: true
        },
    }],
    timeLimitInMinutes :{
        type: Number,
        required: true
    },
    totalMarks : {type: Number,
        required: true
    },
    averageMarks : {
        type: Number,
        default: 0
    },
    maxMarks : {
        type: Number,
        default: 0
    },
    minMarks : {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('assessments',assessmemtSchema);