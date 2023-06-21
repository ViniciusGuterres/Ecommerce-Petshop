const bodyParser = require('body-parser');

// Controllers
const saveOrderController = require('../controllers/saveOrder.js').saveOrder;
const getOrdersController = require('../controllers/getOrders.js').getOrders;
const updateOrderController = require('../controllers/updateOrder.js').updateOrder;

module.exports = (app) => {
    app.post('/saveOrder', bodyParser.json(), saveOrderController);
    app.get('/getOrders/:id?', bodyParser.json(), getOrdersController);
    app.put('/updateOrder/:id?', bodyParser.json(), updateOrderController);
}