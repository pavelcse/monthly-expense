const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    expenses: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Expense'
        }]
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;