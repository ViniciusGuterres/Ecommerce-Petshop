// Requires model
const orderModel = require('../models/order.js');
const customerModel = require('../models/customer.js');
const productModel = require('../models/product.js');
const auth = require('../auth/auth.js');
const jwt = require('jsonwebtoken');

async function saveOrder(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const main = async () => {
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

        if (!customerId || (typeof customerId != 'number')) {
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
            const productsIds = []; 4
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
                doc?.forEach(({ code, _id, price }) => {
                    mongoProductsObj[code] = {
                        _id,
                        price,
                    }
                });
            });

            const newProducts = [];
            let invalidProductCode = null;
            let totalPrice = null;

            for (let i = 0; i < products.length; i++) {
                const productRow = products[i];
                const productAmount = productRow.amount;

                const currentMongoProductObj = mongoProductsObj[productRow.code];

                // Verifying if the product exist at mongo, otherwise, push in to new products array
                if (!currentMongoProductObj) {
                    invalidProductCode = productRow.code;
                    break;
                }

                const productPriceOrderWithQtd = currentMongoProductObj.price * productAmount;

                // sum total price
                totalPrice += productPriceOrderWithQtd;

                newProducts.push({
                    amount: productAmount,
                    _id: currentMongoProductObj._id
                });
            }

            if (invalidProductCode) {
                console.log(`controllers/saveOrder - the follow product do not exist at mongo. Product code: ${invalidProductCode}`);
                objReturn.error = `the follow product do not exist at mongo. Product code: ${invalidProductCode}`;
                objReturn.resStatus = 400;
                return;
            }

            orderObj.customer = mongoCustomer._id;

            // Init as 'faturado' by default
            orderObj.status = 'aguardando pagamento';

            orderObj.products = newProducts;
            orderObj.total = totalPrice;

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
    }

    let authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('controllers/saveOrder - missing authorization token');
        objReturn.resStatus = 401;
        objReturn.error = "missing authorization token";
        controllerReturn(objReturn, res);
        return;
    }

    try {
        authHeader = JSON.parse(authHeader)
    } catch (error) {
        console.log('Error to parse jwt auth token', error);
    };

    jwt.verify(authHeader, 'CHAVESUPERSCRETAPAPAGAIO', function (err, decoded) {
        if (err) {
            console.log('controllers/saveOrder - Failed to authenticate token. ERROR - ', err);
            objReturn.resStatus = 500;
            objReturn.error = "Failed to authenticate token.";
            controllerReturn(objReturn, res);
            return;
        }

        main();
    });
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