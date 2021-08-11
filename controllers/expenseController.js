const expenseValidator = require('../validator/expenseValidator');

const Expense = require('../model/Expense');

module.exports = {
    add(req, res) {
        let { totalIncome, monthName, expenses, totalExp, inBalance } = req.body
        let userId = req.user._id;

        let {item_name, item_cost} = req.body;
        let validate = expenseValidator({totalIncome, monthName, expenses});
        
        if(!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            
            let expense = new Expense({
                total_income: totalIncome, 
                month_name: monthName,
                total_exp: totalExp, 
                in_balance: inBalance,
                expenses: expenses, 
                user: userId,
            })

            expense.save()
            .then(expense => {
                return res.status(201).json({
                    message: 'New Expense created successfully',
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
        let userId = req.user._id;
        Expense.find({user: userId}).exec()
            .then(expenses => {
                return res.status(201).json({
                    expenses
                });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
        
    },
    details(req, res) {
        let id = req.params.itemId;
        Expense.findById(id)
            .then(expense => {
                return res.status(201).json({
                    expense
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
        Expense.findByIdAndDelete(id)
            .then(item => {
                return res.status(201).json({
                    message: 'Item Deleted',
                    expense: item
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