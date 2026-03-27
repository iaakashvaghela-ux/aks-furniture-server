let express = require("express");
const { countryCreate, countryView, countryDelete, countryUpdate, countryChangeStatus, countrySingleData } = require("../../controller/admin/countryController");


let countryRouter = express.Router();

countryRouter.post("/add", countryCreate);
countryRouter.get('/view', countryView)
countryRouter.post('/delete', countryDelete)
countryRouter.put('/update/:id', countryUpdate)
countryRouter.post('/change-status', countryChangeStatus)
countryRouter.get('/single/:id', countrySingleData)



module.exports = countryRouter;