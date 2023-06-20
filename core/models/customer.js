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
        required: true,
    },
    password: {
        type: String,
        required: true,
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

// Method to decrypt the sended password and see if it match with the saved encrypted password
customersSchema.method.comparePassword = async function (password) {
    if (!password) throw new Error('Missing password');

    try {
        const bcryptCompareResult = await bcrypt.compare(password, this.password);

        return bcryptCompareResult;
    } catch (error) {
        console.log(`Error comparing encrypting password, ${error}`);
    }
}

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