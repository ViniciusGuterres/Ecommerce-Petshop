const bodyParser = require('body-parser');

// Controllers
const saveCategoryController = require('../controllers/saveCategory.js').saveCategory;
const getCategoriesController = require('../controllers/getCategories.js').getCategories;
const updateCategoryController = require('../controllers/updateCategory.js').updateCategory;
const deleteCategoryController = require('../controllers/deleteCategory.js').deleteCategory;

module.exports = (app) => {
    app.post('/saveCategory', bodyParser.json(), saveCategoryController);
    app.get('/getCategories/:id?', bodyParser.json(), getCategoriesController);
    app.put('/updateCategory/:id?', bodyParser.json(), updateCategoryController);
    app.delete('/deleteCategory/:id?', deleteCategoryController);
}