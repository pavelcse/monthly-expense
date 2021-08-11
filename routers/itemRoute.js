const router = require('express').Router();

const { add, list, deleteItem } = require('../controllers/ItemController');

// Add Item Route
router.post('/add', add);
router.get('/list', list);
router.get('/delete/:itemId', deleteItem);

module.exports = router;