// Requires model
const orderModel = require('../models/order.js');

async function updateOrder(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/updateOrder - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/updateOrder - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.body) {
        console.log("controllers/updateOrder - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        status
    } = req.body;

    if (
        !status || (typeof name != 'string')
        || (
            status != 'faturado' 
            && status != 'agurdando pagamento'
            && status != 'cancelado'
        )
    ) {
        console.log("controllers/updateOrder - missing status, wrong format or wrong status string");
        objReturn.error = "missing status, wrong format or wrong status string";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting update document at mongo
    try {
        const orderUpdateObj = req.body;
        const updateOrderResult = await orderModel.updateOne({ code: id }, orderUpdateObj);

        objReturn.data = updateOrderResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/updateOrder - Error to create order mongo document - ERROR: ", err);
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

exports.updateOrder = updateOrder;