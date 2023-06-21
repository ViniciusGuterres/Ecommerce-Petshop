const bodyParser = require('body-parser');

// Controllers
const saveOrderController = require('../controllers/saveOrder.js').saveOrder;

module.exports = (app) => {
    app.post('/saveOrder', bodyParser.json(), saveOrderController);
}