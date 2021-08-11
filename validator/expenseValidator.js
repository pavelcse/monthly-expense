const validator = require('validator');

const validate = item => {
    let error = {};

    if(!item.totalIncome) {
        error.total_income = 'Please provide Total Income!';
    }
    if(!item.monthName) {
        error.month_name = 'Please provide Month Name!';
    }
    if(!item.expenses) {
        error.expenses = 'Please select Expenses!';
    }
    

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;