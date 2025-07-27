const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

router.post('/', async (req, res) => {
  try {
    const { name, sku, price, warehouseId, initialQuantity } = req.body;

    // Validate input
    if (!name || !sku || !price || !warehouseId || initialQuantity == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check SKU uniqueness
    const existing = await Product.findOne({ sku });
    if (existing) {
      return res.status(409).json({ error: 'SKU already exists' });
    }

    // Create new product
    const product = new Product({ name, sku, price });
    await product.save();

    // Create inventory
    const inventory = new Inventory({
      productId: product._id,
      warehouseId,
      quantity: initialQuantity 
    });
    await inventory.save();

    res.status(201).json({ message: 'Product created', productId: product._id });

  } catch (error) {
    console.error(" Error:", error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
