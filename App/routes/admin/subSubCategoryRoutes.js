let express = require("express");
const { upload } = require("../../config/imageUpload");

let subSubCategoryRouter = express.Router();
const { subSubCategoryCreate, subSubCategoryView, getParentCategory, subSubCategoryDelete, subSubCategoryUpdate, subSubCategoryChangeStatus, subSubCatSingleData } = require("../../controller/admin/subSubCategoryController");
const { getSubCategory } = require("../../controller/admin/subSubCategoryController");

subSubCategoryRouter.post("/add", upload.single("image"), subSubCategoryCreate);
subSubCategoryRouter.get("/view", subSubCategoryView);
subSubCategoryRouter.get("/parent", getParentCategory);
subSubCategoryRouter.get("/sub-category/:id", getSubCategory);

subSubCategoryRouter.get('/single/:id', subSubCatSingleData)
subSubCategoryRouter.post('/delete', subSubCategoryDelete)
subSubCategoryRouter.put('/update/:id', upload.single("image"), subSubCategoryUpdate)
subSubCategoryRouter.post('/change-status', subSubCategoryChangeStatus)



module.exports = subSubCategoryRouter;
