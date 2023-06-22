const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customersSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
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
    includeDate: {
        type: Date,
        default: Date.now
    },
    cardName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
    },
    cardCVC: {
        type: String,
        required: true,
    },
    cardExpirationDate: {
        type: String,
        required: true,
    }
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

// Hashing cardCVC field
customersSchema.pre('save', function (next) {
    if (this.isModified('cardCVC')) {
        bcrypt.hash(this.cardCVC, 8, (err, hash) => {
            if (err) return next(err);
            this.cardCVC = hash;
            
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