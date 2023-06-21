const customerRoutes = require('./CustomerRoutes.js');
const categoryRoutes = require('./CategoryRoutes.js');
const productRoutes = require('./ProductRoutes.js');
const orderRoutes = require('./OrderRoutes.js');

module.exports = (app) => {
    customerRoutes(app);
    categoryRoutes(app);
    productRoutes(app);
    orderRoutes(app);
}