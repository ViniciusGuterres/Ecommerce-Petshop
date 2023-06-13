const bodyParser = require('body-parser');

// Controllers
const saveCustomerController = require('../controllers/saveCustomer.js').saveCustomer;

module.exports = (app) => {
    app.post('/saveCustomer', bodyParser.json(), saveCustomerController);
}