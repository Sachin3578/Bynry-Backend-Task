const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, 
}, {timestamps: true});

inventorySchema.index({productId: 1, warehouseId: 1}, {unique: true});

module.exports = mongoose.model('Inventory', inventorySchema);