const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateMaterialInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.link = !isEmpty(data.link) ? data.link : '';
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = 'Type field is required';
    }
    if(!Validator.isURL(data.link)){
        errors.link ='Invalid URL'
    }
    if (Validator.isEmpty(data.link)) {
        errors.link = 'Link field is required';
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
};