const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    total_income: {
        type: Number,
        require: true
    },
    month_name: {
        type: String,
        require: true,
        trim: true
    },
    total_exp: { 
        type: Number,
        require: true
    },
    in_balance: { 
        type: Number,
        require: true
    },
    expenses: {
        type: [{}],
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Expense = mongoose.model('Expense', userSchema);
module.exports = Expense;