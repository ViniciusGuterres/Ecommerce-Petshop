const bodyParser = require('body-parser');

// Controllers
const saveCategoryController = require('../controllers/saveCategory.js').saveCategory;

module.exports = (app) => {
    app.post('/saveCategory', bodyParser.json(), saveCategoryController);
}