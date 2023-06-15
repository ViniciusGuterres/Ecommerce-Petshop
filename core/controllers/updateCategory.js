// Requires model
const categoryModel = require('../models/category.js');

async function updateCategory(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/updateCategory - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/updateCategory - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.body) {
        console.log("controllers/updateCategory - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        description,
    } = req.body;

    if (name && (typeof name != 'string')) {
        console.log("controllers/updateCategory - name or wrong format");
        objReturn.error = "name or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    if (description && (typeof description != 'string')) {
        console.log("controllers/updateCategory - description or wrong format");
        objReturn.error = "description or wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    // Starting creating document at mongo
    try {
        const categoryUpdateObj = req.body;

        const updateCategoryResult = await categoryModel.updateOne({ code: id }, categoryUpdateObj);

        objReturn.data = updateCategoryResult;
        objReturn.resStatus = 201;
    } catch (err) {
        console.log("controllers/updateCategory - Error to create category mongo document - ERROR: ", err);
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

exports.updateCategory = updateCategory;