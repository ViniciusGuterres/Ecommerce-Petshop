// Requires model
const productModel = require('../models/product.js');

async function updateProduct(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/updateProduct - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/updateProduct - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.body) {
        console.log("controllers/updateProduct - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        image,
        price,
        categoryId,
        animal,
        comments,
        description,
    } = req.body;

    if (!name && (typeof name != 'string')) {
        console.log("controllers/updateProduct - missing name or wrong format");
        objReturn.error = "missing name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }
    
    if (!description && (typeof description != 'string')) {
        console.log("controllers/updateProduct - missing description or wrong format");
        objReturn.error = "missing description or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!price && (typeof price != 'number')) {
        console.log("controllers/updateProduct - missing price or wrong format");
        objReturn.error = "missing price or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!categoryId && (typeof categoryId != 'number')) {
        console.log("controllers/updateProduct - missing categoryId or wrong format");
        objReturn.error = "missing categoryId or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }
    
    if (!animal && (typeof animal != 'string')) {
        console.log("controllers/updateProduct - missing animal or wrong format");
        objReturn.error = "missing animal or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!comments && (typeof comments != 'object')) {
        console.log("controllers/updateProduct - missing comments or wrong format");
        objReturn.error = "missing comments or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const productUpdateObj = req.body;

        const updateProductResult = await productModel.updateOne({ code: id }, productUpdateObj);

        objReturn.data = updateProductResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/updateProduct - Error to create product mongo document - ERROR: ", err);
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

exports.updateProduct = updateProduct;