const router = require('express').Router();

const { add, list, details, deleteItem } = require('../controllers/expenseController');
const authenticate = require('../authenticate');
// Add Item Route
router.post('/add', authenticate, add);
router.get('/list', authenticate, list);
router.get('/details/:itemId', authenticate, details);
router.get('/delete/:itemId', deleteItem);

module.exports = router;