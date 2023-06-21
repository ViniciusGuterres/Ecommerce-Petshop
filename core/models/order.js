const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'customers',
        require: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refs: 'products',
            require: true,
        }
    ],
    includeDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('orders', ordersSchema);