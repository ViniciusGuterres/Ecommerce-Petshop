const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    cpf: {
        type: Number,
        require: true
    },
    telephone: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    profileImage: {
        type: Buffer
    }
});

module.exports = mongoose.model('customers', customersSchema);