// Requires model
const categoryModel = require('../models/category.js');

async function getCategories(req, res, next) {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Globals
    const objReturn = {
        data: null,
        error: null,
        resStatus: null,
    };

    const {
        name
    } = req.body;

    const categoryCodeParam = req?.params?.id || null;

    if (name && (typeof name != 'string')) {
        console.log("controllers/getCategories - name wrong format");
        objReturn.error = "name wrong format";
        objReturn.resStatus = 400;
        controllerReturn(objReturn, res);
        return;
    }

    async function getCategoryByCode() {
        try {
            const getCategoryResult = await categoryModel.findOne({ code: categoryCodeParam });

            objReturn.data = getCategoryResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCategories - Error to get category by code at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getCategoriesByFields() {
        try {
            // Filter category by name
            const getCategoryResult = await categoryModel.find({ name });

            objReturn.data = getCategoryResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCategories - Error to get category by fields at mongo document, - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    async function getAllCategories() {
        try {
            const getAllCategoriesResult = await categoryModel.find({});

            objReturn.data = getAllCategoriesResult;
            objReturn.resStatus = 200;
        } catch (err) {
            console.log("controllers/getCategories - Error to get categories mongo document - ERROR: ", err);
            objReturn.error = err;
            objReturn.resStatus = 500;
        } finally {
            controllerReturn(objReturn, res);
        }
    }

    // Getting category by code case has param, 
    if (categoryCodeParam) {
        getCategoryByCode();
    }
    // Otherwise get by document fields case has it on body
    else if (Object.keys(req.body)?.length) {
        getCategoriesByFields();
    }
    // Else get all categories by default
    else {
        getAllCategories();
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

exports.getCategories = getCategories;