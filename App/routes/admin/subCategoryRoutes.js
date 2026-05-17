let express = require("express");
const { upload } = require("../../config/imageUpload");

let subCategoryRouter = express.Router();
const { subCategoryCreate, subCategoryView, getParentCategory, subCategoryDelete, subCategoryUpdate, subCategoryChangeStatus, subCatSingleData } = require("../../controller/admin/subCategoryController");

subCategoryRouter.post("/add", upload.single("image"), subCategoryCreate);
subCategoryRouter.get("/view",subCategoryView);
subCategoryRouter.get("/parent",getParentCategory);
subCategoryRouter.get("/single/:id", subCatSingleData)
subCategoryRouter.post('/delete', subCategoryDelete)
subCategoryRouter.put('/update/:id', upload.single("image"), subCategoryUpdate)
subCategoryRouter.post('/change-status', subCategoryChangeStatus)



module.exports = subCategoryRouter;
