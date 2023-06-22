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

    let productCodeParam = req?.params?.id || null;

    try {
        productCodeParam = JSON.parse(productCodeParam);
    } catch (err) {
        console.log("controllers/getProducts - Error to parse productCodeParam JSON: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    }

    /**
     * @function controllers/getProducts/getProductByCode
     * @summary - Will get the mongo product passed by param code
     */
    async function getProductByCode() {
        try {
            // Getting the product, aggregating with category schema
            await productModel.aggregate([
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
            ]).then(productDocument => {
                const productDocumentReturned = productDocument?.[0] || []

                // Will convert the product image to base64
                if (productDocumentReturned?.image) {
                    productDocumentReturned.image = productDocumentReturned.image?.toString('ascii');
                }

                objReturn.data = [productDocumentReturned];
                objReturn.resStatus = 200;
            }).catch(err => {
                console.log("controllers/getProducts - Error to get product by code at mongo document, - ERROR: ", err);
                objReturn.error = err;
                objReturn.resStatus = 500;
            });

        } catch (err) {
            console.log("controllers/getProducts - Error to get product by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    /**
 * @function controllers/getProducts/getProductsList
 * @summary - Will get the mongo product passed by param list codes
 */
    async function getProductsList() {
        try {
            const productIds = productCodeParam.productList.map(code => +code);

            // Getting the product, aggregating with category schema
            await productModel.aggregate([
                {
                    $match: { code: { $in: productIds } }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_obj"
                    }
                }
            ]).then(productDocument => {
                const productDocumentReturned = productDocument?.map(product => {
                    // Will convert the product image to base64
                    if (product?.image) {
                        product.image = product.image?.toString('ascii');
                    }

                    return product;
                });

                objReturn.data = productDocumentReturned;
                objReturn.resStatus = 200;
            }).catch(err => {
                console.log("controllers/getProducts - Error to get product by code at mongo document, - ERROR: ", err);
                objReturn.error = err;
                objReturn.resStatus = 500;
            });

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
            // Req return objects
            const productsByCategoryObj = {};
            const categoriesDictionary = {};

            // Getting the products, aggregating with category schema
            await productModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_obj"
                    }
                }
            ]).then(productDocuments => {
                // Will loop through all products to separate each by category and convert the image to base64
                productDocuments.forEach(product => {
                    // Converting product image Buffer to Base64
                    product.image = product.image.toString('ascii');

                    // Sorting out each product by category
                    const productCategory = product?.category_obj?.[0] || {};

                    if (Object.keys(productCategory)?.length) {
                        const { code: categoryCode, name: categoryName } = productCategory;

                        // If the category obj isn't initialized yet, do it, otherwise, just push the product in the current category
                        if (!productsByCategoryObj[categoryCode]) {
                            productsByCategoryObj[categoryCode] = [product];

                            // Adding the category to the dictionary obj
                            categoriesDictionary[categoryCode] = categoryName;
                        } else {
                            productsByCategoryObj[categoryCode]?.push(product);
                        }
                    }
                });

                objReturn.data = { categoriesObj: productsByCategoryObj, categoriesDictionary };
                objReturn.resStatus = 200;
            }).catch(err => {
                console.log("controllers/getProducts - Error to get products mongo document - ERROR: ", err);
                objReturn.error = err;
                objReturn.resStatus = 500;
            });
        } catch (err) {
            console.log("controllers/getProducts - Error to get products mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    // Getting product by code case has param, otherwise, get all products 
    if (productCodeParam?.productList?.length) {
        getProductsList();
    } else if (productCodeParam && (typeof productCodeParam == 'number' || typeof productCodeParam == 'string')) {
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