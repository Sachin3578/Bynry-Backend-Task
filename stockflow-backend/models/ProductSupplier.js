const mongoose = require('mongoose');

const productSupplierSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
});

productSupplierSchema.index({ productId: 1, supplierId: 1 }, { unique: true });

module.exports = mongoose.model('ProductSupplier', productSupplierSchema);
