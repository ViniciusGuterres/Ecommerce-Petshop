// Requires model
const orderModel = require('../models/order.js');
const productModel = require('../models/product.js');

async function getOrders(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const orderCodeParam = req?.params?.id || null;

    if (
        orderCodeParam &&
        (typeof orderCodeParam != 'string' && typeof orderCodeParam != 'number')
    ) {
        console.log("controllers/getOrders - orderCodeParam wrong format");
        objReturn.error = "orderCodeParam wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    /**
     * @function controllers/getOrders/getOrderByCode
     * @summary - Will get the mongo getOrders passed by param code
     */
    async function getOrderByCode() {
        try {
            // Getting the orderCodeParam
            const order = await orderModel.find({ code: +orderCodeParam });

            objReturn.data = order;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getOrders - Error to get product by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    /**
     * @function controllers/getOrders/getAllOrders
     * @summary - Will get all mongo getOrders
     */
    async function getAllOrders() {
        try {
            // Getting the order
            const getOrders = await orderModel.find({});

            objReturn.data = [getOrders];
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getOrders - Error to get products mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    if (orderCodeParam) {
        getOrderByCode();
    } else {
        getAllOrders();
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

exports.getOrders = getOrders;