const bodyParser = require('body-parser');

// Controllers
const saveProductController = require('../controllers/saveProduct.js').saveProduct;

module.exports = (app) => {
    app.post('/saveProduct', bodyParser.json(), saveProductController);
}