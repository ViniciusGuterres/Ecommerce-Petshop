const bodyParser = require('body-parser');

// Controllers
const saveCustomerController = require('../controllers/saveCustomer.js').saveCustomer;
const getCustomersController = require('../controllers/getCustomers.js').getCustomers;

module.exports = (app) => {
    app.post('/saveCustomer', bodyParser.json(), saveCustomerController);
    app.get('/getCustomers/:id?', bodyParser.json(), getCustomersController);
}