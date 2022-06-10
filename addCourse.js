const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateMaterialInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.id = !isEmpty(data.id) ? data.id : '';
    data.instructor = !isEmpty(data.instructor) ? data.instructor : '';
    data.duration = !isEmpty(data.duration) ? data.duration : '';
    data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : '';
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
    }
    if (Validator.isEmpty(data.id)) {
        errors.id = 'ID field is required';
    }
    if (!Validator.isLength(data.instructor, { min: 5, max: 40 })) {
        errors.instructor = 'Instructor must be between 5 and 40 characters';
    }
    if (Validator.isEmpty(data.instructor)) {
        errors.instructor = 'Instructor field is required';
    }
    if (Validator.isEmpty(data.duration)) {
        errors.duration = 'Duration field is required';
    }
    if (Validator.isEmpty(data.difficulty)) {
        errors.difficulty = 'Difficulty field is required';
    }
    else if(parseInt(data.difficulty) > 5){
        errors.difficulty = 'Difficulty must be less than or equal to 5'
    }
    return {
        errors,
        isValid : isEmpty(errors)
    }
};