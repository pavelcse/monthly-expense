const itemValidator = require('../validator/itemValidator');

const Item = require('../model/Item');

module.exports = {
    add(req, res) {
        let {item_name, item_cost} = req.body;
        let validate = itemValidator({item_name, item_cost});
        
        if(!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            
            let item = new Item({
                item_name, 
                item_cost
            })

            item.save()
            .then(item => {
                return res.status(201).json({
                    message: 'Item created successfully',
                    item
                });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
        }
    },
    list(req, res) {
        Item.find()
            .then(items => {
                return res.status(201).json({
                    items
                });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
        
    },
    deleteItem(req, res) {
        let id = req.params.itemId;
        Item.findByIdAndDelete(id)
            .then(items => {
                return res.status(201).json({
                    message: 'Item Deleted'
                });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
    }
}