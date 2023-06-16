const bodyParser = require('body-parser');

// Controllers
const saveCustomerController = require('../controllers/saveCustomer.js').saveCustomer;
const getCustomersController = require('../controllers/getCustomers.js').getCustomers;
const updateCustomerController = require('../controllers/updateCustomer.js').updateCustomer;

module.exports = (app) => {
    app.post('/saveCustomer', bodyParser.json(), saveCustomerController);
    app.get('/getCustomers/:id?', bodyParser.json(), getCustomersController);
    app.put('/updateCustomer/:id', bodyParser.json(), updateCustomerController);
}