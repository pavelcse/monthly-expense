const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_name: {
        type: String,
        require: true,
        trim: true
    },
    item_cost: {
        type: Number,
        require: true
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;