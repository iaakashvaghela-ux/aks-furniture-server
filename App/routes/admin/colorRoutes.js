let express = require("express");
const { colorCreate, colorChangeStatus, colorUpdate, colorDelete, colorView, singleData } = require("../../controller/admin/colorController");
let colorRouter = express.Router();

colorRouter.post("/add", colorCreate);
colorRouter.get("/single/:id", singleData);
colorRouter.get('/view', colorView);
colorRouter.post('/delete', colorDelete);
colorRouter.put('/update/:id', colorUpdate);
colorRouter.post('/change-status', colorChangeStatus);


module.exports = colorRouter;