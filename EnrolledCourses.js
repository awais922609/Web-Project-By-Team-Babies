const mongoose = require('mongoose');
const Schema = mongoose.Schema

const enrolledCoursesSchema = new Schema ({
    enrollmentID: {
        type: String,
        required: true},
    learnerID : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    courseID : {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    Assessments : [
        {
            assessment : {
                type: Schema.Types.ObjectId,
                ref: 'assessment'
            },
            obtainedMarks : {
                type: Number,
                default: 0
            },
            weightage : {
                type : Number,
                required : true
            },
            
        }
    ],
    materials : [
        {type: Schema.Types.ObjectId,
        ref: 'materials'}
    ],
    isCompleted :{
        type : Boolean,
        default: false
    },
    progress : {
        type : Number,
        default: 0
    }
})
module.exports = mongoose.model('enrolledCourses',enrolledCoursesSchema);