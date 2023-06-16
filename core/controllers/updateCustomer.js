// Requires model
const customerModel = require('../models/customer.js');

async function updateCustomer(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/updateCustomer - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/updateCustomer - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.body) {
        console.log("controllers/updateCustomer - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        lastName,
        cpf,
        telephone,
        address,
        city,
        state,
        profileImage
    } = req.body;

    if (name && (typeof name != 'string')) {
        console.log("controllers/saveCustomer - missing name or wrong format");
        objReturn.error = "missing name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (lastName && (typeof lastName != 'string')) {
        console.log("controllers/saveCustomer - missing lastName or wrong format");
        objReturn.error = "missing lastName or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (cpf && (typeof cpf != 'number')) {
        console.log("controllers/saveCustomer - missing cpf or wrong format");
        objReturn.error = "missing cpf or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (lastName && (typeof lastName != 'string')) {
        console.log("controllers/saveCustomer - missing lastName or wrong format");
        objReturn.error = "missing lastName or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (telephone && (typeof telephone != 'number')) {
        console.log("controllers/saveCustomer - missing telephone or wrong format");
        objReturn.error = "missing telephone or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (address && (typeof address != 'string')) {
        console.log("controllers/saveCustomer - missing address or wrong format");
        objReturn.error = "missing address or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (city && (typeof city != 'string')) {
        console.log("controllers/saveCustomer - missing city or wrong format");
        objReturn.error = "missing city or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (state && (typeof state != 'string')) {
        console.log("controllers/saveCustomer - missing state or wrong format");
        objReturn.error = "missing state or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const customerUpdateObj = req.body;

        const updateCustomerResult = await customerModel.updateOne({ code: id }, customerUpdateObj);

        objReturn.data = updateCustomerResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/updateCustomer - Error to create customer mongo document - ERROR: ", err);
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

exports.updateCustomer = updateCustomer;