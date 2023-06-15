const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('categories', categoriesSchema);