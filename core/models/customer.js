const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        select: false,
    },
    dataInclusao: {
        type: Date,
        default: Date.now
    },
});

// Hashing password field
customersSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            
            next();
        });
    }
});

// Method to verify if the passed email is already in use
customersSchema.statics.isEmailAlreadyInUse = async function (email) {
    if (!email) throw new Error('Missing email');
    
    try {
        const customer = await this.findOne({ email });        
        if (customer) return true;
            
        return false;
    } catch(error) {
        console.log('isEmailAlreadyInUse method error - ', error.message);
        return true;
    }
}

module.exports = mongoose.model('customers', customersSchema);