// Requires model
const customerModel = require('../models/customer.js');

async function getCustomers(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const {
        name,
        lastName,
        cpf,
        city,
        state,
    } = req.body;

    const customerCodeParam = req?.params?.id || null;

    if (name && (typeof name != 'string')) {
        console.log("controllers/getCustomers - name wrong format");
        objReturn.error = "name wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (lastName && (typeof lastName != 'string')) {
        console.log("controllers/getCustomers - lastName wrong format");
        objReturn.error = "lastName wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (cpf && (typeof cpf != 'number')) {
        console.log("controllers/getCustomers - cpf wrong format");
        objReturn.error = "cpf wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (city && (typeof city != 'string')) {
        console.log("controllers/getCustomers - city wrong format");
        objReturn.error = "city wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (state && (typeof state != 'string')) {
        console.log("controllers/getCustomers - state wrong format");
        objReturn.error = "state wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    async function getCustomerByCode() {
        try {
            const getCustomerResult = await customerModel.findOne({ code: customerCodeParam });

            objReturn.data = getCustomerResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCustomers - Error to get customer by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getCustomersByFields() {
        try {
            // Filter customer by fields using OR operator
            const getCustomerResult = await customerModel.find({$or:[{name}, {lastName},{city}, {state}, {status}]});

            objReturn.data = getCustomerResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCustomers - Error to get customer by fields at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getAllCustomers() {
        try {
            const getAllCustomersResult = await customerModel.find({});

            objReturn.data = getAllCustomersResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCustomers - Error to get customers mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    // Getting customer by code case has param, 
    if (customerCodeParam) {
        getCustomerByCode();
    }
    // Otherwise get by document fields case has it on body
    else if (Object.keys(req.body)?.length) {
        getCustomersByFields();
    }
    // Else get all customers by default
    else {
        getAllCustomers();
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

exports.getCustomers = getCustomers;