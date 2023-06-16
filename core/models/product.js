const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: Buffer,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    categoryId: {
        type: Number,
        require: true,
    },
    animal: {
        type: String,
        require: true,
    },
    Comments: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('products', productSchema);