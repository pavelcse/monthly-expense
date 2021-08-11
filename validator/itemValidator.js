const validator = require('validator');

const validate = item => {
    let error = {};

    if(!item.item_name) {
        error.item_name = 'Please provide your item name!';
    }

    if(!item.item_cost) {
        error.item_cost = 'Please provide your item cost!';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;