const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticate');

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', authenticateToken, addProduct);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

module.exports = router;
