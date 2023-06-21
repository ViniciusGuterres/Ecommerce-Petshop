// Requires model
const customerModel = require('../models/customer.js');
const auth = require('../auth/auth.js');
const bcrypt = require('bcryptjs');

async function signInCustomer(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.body) {
        console.log("controllers/signInCustomer - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        email,
        password,
    } = req.body;

    if (!email || (typeof email != 'string')) {
        console.log("controllers/signInCustomer - missing email or wrong format");
        objReturn.error = "missing email or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!password || (typeof password != 'string')) {
        console.log("controllers/signInCustomer - missing password or wrong format");
        objReturn.error = "missing password or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    try {
        // Check if email exists
        const customer = await customerModel.findOne({ email });

        if (!customer) {
            console.log('controllers/signInCustomer - Email or password invalid');
            objReturn.error = 'controllers/signInCustomer - Email or password invalid';
            objReturn.resStatus = 400;
            return;
        }

        // Check if passwords match
        const passwordMatch = await bcrypt.compare(password, customer.password)

        if (!passwordMatch) {
            console.log('controllers/signInCustomer - Email or password invalid');
            objReturn.error = 'controllers/signInCustomer - Email or password invalid';
            objReturn.resStatus = 400;
            return;
        }

        await auth.includeToken(customer)
            .then(doc => {
                objReturn.data = doc;
                objReturn.resStatus = 201;
            });
    } catch (err) {
        console.log("controllers/signInCustomer - Error to execute customer mongo operations - ERROR: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    }
    finally {
        controllerReturn(objReturn, res);
    }
};

function controllerReturn(objReturn, res) {
    const { error, data, resStatus } = objReturn;

    if (error || !data) {
        res.status(resStatus).send(objReturn);
        return;
    }

    res.status(resStatus).send(objReturn);
}

exports.signInCustomer = signInCustomer;