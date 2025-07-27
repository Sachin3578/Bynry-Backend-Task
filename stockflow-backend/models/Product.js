const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    isBundle: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', productSchema);