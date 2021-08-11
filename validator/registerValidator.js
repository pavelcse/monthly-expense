const validator = require('validator');

const validate = user => {
    let error = {};

    if(!user.name) {
        error.name = 'Please provide your name!';
    }

    if(!user.email) {
        error.email = 'Please provide your email!';
    }  else if(!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid email!';
    }

    if(!user.password) {
        error.password = 'Please provide your password!';
    } else if(user.password < 4) {
        error.password = 'Password must be grater then 4 character!'
    }

    if(!user.confirmPassword) {
        error.confirmPassword = 'Please provide confirm password!';
    } else if(user.confirmPassword !== user.password) {
        error.confirmPassword = 'password doesn\'t match!';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;