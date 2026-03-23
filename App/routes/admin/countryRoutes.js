let express = require("express");
const { countryCreate, countryView, countryDelete, countryUpdate, countryChangeStatus } = require("../../controller/admin/countryController");


let countryRouter = express.Router();

countryRouter.post("/add", countryCreate);
countryRouter.get('/view', countryView)
countryRouter.post('/delete', countryDelete)
countryRouter.put('/update', countryUpdate)
countryRouter.post('/change-status', countryChangeStatus)



module.exports = countryRouter;