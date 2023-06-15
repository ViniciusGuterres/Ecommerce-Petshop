const customerRoutes = require('./CustomerRoutes.js');
const CategoryRoutes = require('./CategoryRoutes.js');

module.exports = (app) => {
    customerRoutes(app);
    CategoryRoutes(app);
}