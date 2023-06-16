const bodyParser = require('body-parser');

// Controllers
const saveProductController = require('../controllers/saveProduct.js').saveProduct;
const getProductsController = require('../controllers/getProducts.js').getProducts;

module.exports = (app) => {
    app.post('/saveProduct', bodyParser.json(), saveProductController);
    app.get('/getProducts/:id?', bodyParser.json(), getProductsController);
}