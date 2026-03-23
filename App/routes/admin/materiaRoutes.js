let express = require("express");
const { materialsCreate, materialsView, materialsDelete, materialsUpdate, materialsChangeStatus, materialsSingleData } = require("../../controller/admin/materialsController");

let materialsRouter = express.Router();

materialsRouter.post("/add", materialsCreate);
materialsRouter.get('/view', materialsView)
materialsRouter.post('/delete', materialsDelete)
materialsRouter.put('/update', materialsUpdate)
materialsRouter.post('/change-status', materialsChangeStatus)
materialsRouter.get("/single/:id", materialsSingleData);


module.exports = materialsRouter;