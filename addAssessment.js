const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateAddAssessment(data){
    let errors = {};
    data.id = !isEmpty(data.id) ? data.id : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.timeLimitInMinutes = !isEmpty(data.timeLimitInMinutes) ? data.timeLimitInMinutes : '';
    data.totalMarks = !isEmpty(data.totalMarks) ? data.totalMarks : '';
    if(Validator.isEmpty(data.id)){
        errors.id = {id : "ID field cannot be empty"}
    }
    if(Validator.isEmpty(data.name)){
        errors.name = {name : "Name field cannot be empty"}
    }
    if(Validator.isEmpty(data.timeLimitInMinutes)){
        errors.timeLimitInMinutes = {timeLimitInMinutes : "timeLimitInMinutes field cannot be empty"}
    }
    if(Validator.isEmpty(data.totalMarks)){
        errors.totalMarks = {totalMarks : "Total Marks field cannot be empty"}
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }

    

}