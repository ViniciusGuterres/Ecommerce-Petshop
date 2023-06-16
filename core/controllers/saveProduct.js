// Requires model
const productModel = require('../models/product.js');

async function saveProduct(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.body) {
        console.log("controllers/saveProduct - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        image,
        description,
        price,
        categoryId,
        animal,
        comments
    } = req.body;

    if (!name || (typeof name != 'string')) {
        console.log("controllers/saveProduct - missing name or wrong format");
        objReturn.error = "missing name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!image) {
        console.log("controllers/saveProduct - missing image");
        objReturn.error = "missing image or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }
    
    if (!description || (typeof description != 'string')) {
        console.log("controllers/saveProduct - missing description or wrong format");
        objReturn.error = "missing description or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!price || (typeof price != 'number')) {
        console.log("controllers/saveProduct - missing price or wrong format");
        objReturn.error = "missing price or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!categoryId || (typeof categoryId != 'number')) {
        console.log("controllers/saveProduct - missing categoryId or wrong format");
        objReturn.error = "missing categoryId or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }
    
    if (!animal || (typeof animal != 'string')) {
        console.log("controllers/saveProduct - missing animal or wrong format");
        objReturn.error = "missing animal or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!comments || (typeof comments != 'object')) {
        console.log("controllers/saveProduct - missing comments or wrong format");
        objReturn.error = "missing comments or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const productObj = req.body;

        // Getting the new product id
        const maxMongoProductID = await productModel.findOne({}).sort({ code: -1 });
        productObj.code = maxMongoProductID == null ? 1 : maxMongoProductID.code + 1;

        const createProductResult = await productModel.create(productObj);

        objReturn.data = createProductResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/saveProduct - Error to create product mongo document - ERROR: ", err);
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

exports.saveProduct = saveProduct;