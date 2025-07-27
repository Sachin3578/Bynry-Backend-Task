const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  location: { type: String },
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
