// Requires model
const categoryModel = require('../models/category.js');

async function deleteCategory(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    }

    if (!req.params) {
        console.log("controllers/deleteCategory - missing req.params");
        objReturn.error = "missing req.params";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/deleteCategory - missing req.id");
        objReturn.error = "missing req.params.id";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    try {
        const deleteCategoryResult = await categoryModel.deleteOne({ code: id });

        objReturn.data = deleteCategoryResult;
        objReturn.resStatus = 200;
    } catch (err) {
        console.log("controllers/deleteCategory - Error to delete category at mongo document, - ERROR: ", err);
        objReturn.error = err;
        objReturn.resStatus = 500;
    } finally {
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

exports.deleteCategory = deleteCategory;