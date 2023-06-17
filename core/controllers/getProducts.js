// Requires model
const productModel = require('../models/product.js');
const categoryModel = require('../models/category.js');

async function getProducts(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const productCodeParam = req?.params?.id || null;

    if (
        productCodeParam &&
        (typeof productCodeParam != 'string' || typeof productCodeParam != 'number')
    ) {
        console.log("controllers/getProducts - productCodeParam wrong format");
        objReturn.error = "productCodeParam wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    /**
     * @function controllers/getProducts/getProductByCode
     * @summary - Will get the mongo product passed by param code
     */
    async function getProductByCode() {
        try {
            // Getting the product, aggregating with category schema
            const getProductResult = await productModel.aggregate([
                {
                    $match: { code: +productCodeParam }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_obj"
                    }
                }
            ]);

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

    /**
     * @function controllers/getProducts/getProductByCode
     * @summary - Will get all mongo products
     */
    async function getAllProducts() {
        try {
            // Getting the products, aggregating with category schema
            const getAllProductsResult = await productModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_obj"
                    }
                }
            ]);

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

    // Getting product by code case has param, otherwise, get all products 
    if (productCodeParam) {
        getProductByCode();
    } else {
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