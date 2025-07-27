const express = require('express');
const router = express.Router();

const Warehouse = require('../models/Warehouse');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const ProductSupplier = require('../models/ProductSupplier');
const Supplier = require('../models/Supplier');

router.get('/companies/:companyId/alerts/low-stock', async (req, res) => {
  try {
    const { companyId } = req.params;

    // Step 1: Get all warehouses for the company
    const warehouses = await Warehouse.find({ companyId });
    const warehouseIds = warehouses.map(w => w._id);

    // Step 2: Fetch inventory for all those warehouses
    const inventoryRecords = await Inventory.find({
      warehouseId: { $in: warehouseIds },
    }).populate('productId warehouseId');

    const alerts = [];

    for (const inv of inventoryRecords) {
      const product = inv.productId;
      const warehouse = inv.warehouseId;

      // Simulate threshold (normally stored in DB)
      const threshold = 20;

      // Simulate recent sales activity + average daily sales
      const hasRecentSales = true; // assumption for now
      const avgDailySales = 1.25;

      if (hasRecentSales && inv.quantity < threshold) {
        const supplierLink = await ProductSupplier.findOne({
          productId: product._id,
        }).populate('supplierId');

        const supplier = supplierLink?.supplierId;

        alerts.push({
          product_id: product._id,
          product_name: product.name,
          sku: product.sku,
          warehouse_id: warehouse._id,
          warehouse_name: warehouse.name,
          current_stock: inv.quantity,
          threshold,
          days_until_stockout: Math.ceil(inv.quantity / avgDailySales),
          supplier: supplier
            ? {
                id: supplier._id,
                name: supplier.name,
                contact_email: supplier.contactEmail,
              }
            : null,
        });
      }
    }

    res.json({ alerts, total_alerts: alerts.length });
  } catch (err) {
    console.error(' Error in low-stock alert:', err.message);
    res.status(500).json({ error: 'Failed to fetch low stock alerts', details: err.message });
  }
});

module.exports = router;
