const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  bundleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  childProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

bundleSchema.index({ bundleId: 1, childProductId: 1 }, { unique: true });

module.exports = mongoose.model('Bundle', bundleSchema);
