const customerRoutes = require('./CustomerRoutes.js');
const categoryRoutes = require('./CategoryRoutes.js');
const productRoutes = require('./ProductRoutes.js');

module.exports = (app) => {
    customerRoutes(app);
    categoryRoutes(app);
    productRoutes(app);
}