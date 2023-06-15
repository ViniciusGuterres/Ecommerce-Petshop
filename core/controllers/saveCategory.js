// Requires model
const categoryModel = require('../models/category.js');

async function saveCategory(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.body) {
        console.log("controllers/saveCategory - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        description
    } = req.body;

    if (!name || (typeof name != 'string')) {
        console.log("controllers/saveCategory - missing name or wrong format");
        objReturn.error = "missing name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!description || (typeof description != 'string')) {
        console.log("controllers/saveCategory - missing description or wrong format");
        objReturn.error = "missing description or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const categoryObj = req.body;

        // Getting the new category id
        const maxMongoCategoryID = await categoryModel.findOne({}).sort({ code: -1 });
        categoryObj.code = maxMongoCategoryID == null ? 1 : maxMongoCategoryID.code + 1;

        const createCategoryResult = await categoryModel.create(categoryObj);

        objReturn.data = createCategoryResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/saveCategory - Error to create category mongo document - ERROR: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    }
    finally {
        controllerReturn(objReturn, res);
    }
};

function controllerReturn(objReturn, res) {
    const { error, data, resStatus } = objReturn;

    if (error || !data) {
        res.status(resStatus).send(objReturn);
        return;
    }

    res.status(resStatus).send(objReturn);
}

exports.saveCategory = saveCategory;