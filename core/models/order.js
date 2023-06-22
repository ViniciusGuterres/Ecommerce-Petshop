const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'customers',
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refs: 'products',
            required: true,
        }
    ],
    includeDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('orders', ordersSchema);