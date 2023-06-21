// Requires model
const orderModel = require('../models/order.js');
const customerModel = require('../models/customer.js');
const productModel = require('../models/product.js');

async function saveOrder(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.body) {
        console.log("controllers/saveOrder - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        customerId,
        products
    } = req.body;

    if (!customerId || (typeof customerId != 'string' && typeof customerId != 'number')) {
        console.log("controllers/saveOrder - missing customerId or wrong format");
        objReturn.error = "missing customerId or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!products || !Array.isArray(products)) {
        console.log("controllers/saveOrder - missing products or wrong format");
        objReturn.error = "missing products or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!products?.length) {
        console.log("controllers/saveOrder - the products list is empty");
        objReturn.error = "the products list is empty";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const orderObj = req.body;

        // Getting the new order id
        const maxOrderID = await orderModel.findOne({}).sort({ code: -1 });
        orderObj.code = maxOrderID == null ? 1 : maxOrderID.code + 1;

        // Getting client id
        const mongoCustomer = await customerModel.findOne({ code: customerId });

        // If do not find the customer id, return error, otherwise, continues save order workflow
        if (!mongoCustomer?._id) {
            console.log(`controllers/saveOrder - the customer: ${customerId} doesn't exists`);
            objReturn.error = `the customerId: ${customerId} doesn't exists`;
            objReturn.resStatus = 400;
            return;
        }

        // Build products list
        const productsIds = [];
        let invalidPositionProduct = null;

        for (let i = 0; i < products.length; i++) {
            const productRow = products[i];

            // Validating each product format
            if (!productRow.code || !productRow.amount) {
                invalidPositionProduct = i;
                break;
            }

            productsIds.push(productRow.code);
        }

        if (invalidPositionProduct) {
            console.log(`controllers/saveOrder - Invalid product format in position: ${invalidPositionProduct}`);
            objReturn.error = `Invalid product format in position: ${invalidPositionProduct}`;
            objReturn.resStatus = 400;
            return;
        }

        // Get the products from mongo
        const mongoProductsObj = {};

        await productModel.find({
            "code": {
                $in: productsIds,
            }
        }).then(doc => {
            doc?.forEach(({ code, _id }) => {
                mongoProductsObj[code] = _id;
            });
        });

        const newProducts = [];
        let invalidProductCode = null;

        for (let i = 0; i < products.length; i++) {
            const productRow = products[i];
            const currentMongoObj = mongoProductsObj[productRow.code];

            // Verifying if the product exist at mongo, otherwise, push in to new products array
            if (!currentMongoObj) {
                invalidProductCode = productRow.code;
                break;
            }

            newProducts.push({
                amount: productRow.amount,
                _id: currentMongoObj._id
            });
        }

        if (invalidProductCode) {
            console.log(`controllers/saveOrder - the follow product do not exist at mongo. Product code: ${invalidProductCode}`);
            objReturn.error = `the follow product do not exist at mongo. Product code: ${invalidProductCode}`;
            objReturn.resStatus = 400;
            return;
        }

        orderObj.products = newProducts;

        // Creating order document
        const createOrderResult = await orderModel.create(orderObj);

        objReturn.data = createOrderResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/saveOrder - Error to create order mongo document - ERROR: ", err);
        objReturn.error = err || "controllers/saveOrder - Error to create order mongo document";
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

exports.saveOrder = saveOrder;