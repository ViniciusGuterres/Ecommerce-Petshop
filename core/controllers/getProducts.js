// Requires model
const productModel = require('../models/product.js');

async function getProducts(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const { name } = req.body;

    const productCodeParam = req?.params?.id || null;

    if (name && (typeof name != 'string')) {
        console.log("controllers/getProducts - name wrong format");
        objReturn.error = "name wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    async function getProductByCode() {
        try {
            const getProductResult = await productModel.findOne({ code: productCodeParam });

            objReturn.data = getProductResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getProducts - Error to get product by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getProductByName() {
        try {
            // Filter product by fields using OR operator
            const getProductResult = await productModel.find({ name });

            objReturn.data = getProductResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getProducts - Error to get product by fields at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getAllProducts() {
        try {
            const getAllProductsResult = await productModel.find({});

            objReturn.data = getAllProductsResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getProducts - Error to get products mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    // Getting product by code case has param, 
    if (productCodeParam) {
        getProductByCode();
    }
    // Otherwise get by document fields case has it on body
    else if (Object.keys(req.body)?.length) {
        getProductByName();
    }
    // Else get all products by default
    else {
        getAllProducts();
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

exports.getProducts = getProducts;