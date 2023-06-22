const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'categories',
        required: true,
    },
    animal: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
    }
});

module.exports = mongoose.model('products', productSchema);