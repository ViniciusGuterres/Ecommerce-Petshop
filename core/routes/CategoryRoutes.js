const bodyParser = require('body-parser');

// Controllers
const saveCategoryController = require('../controllers/saveCategory.js').saveCategory;
const getCategoriesController = require('../controllers/getCategories.js').getCategories;

module.exports = (app) => {
    app.post('/saveCategory', bodyParser.json(), saveCategoryController);
    app.get('/getCategories/:id?', bodyParser.json(), getCategoriesController);
}