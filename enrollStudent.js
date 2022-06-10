const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEnrollStudent(data){
    let errors = {};
    data.learnerID = !isEmpty(data.learnerID) ? data.learnerID : '';
    data.courseID = !isEmpty(data.courseID) ? data.courseID : '';
    data.enrollmentID = !isEmpty(data.enrollmentID) ? data.enrollmentID : '';
    if(Validator.isEmpty(data.learnerID)){
        errors.learnerID = "LearnerID cannont be empty"
    }
    if(Validator.isEmpty(data.courseID)){
        errors.courseID = "courseID cannont be empty"
    }
    if(Validator.isEmpty(data.enrollmentID)){
        errors.courseID = "enrollmentID cannont be empty"
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }

}