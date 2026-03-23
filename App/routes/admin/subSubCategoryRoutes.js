let express = require("express");
const multer = require("multer");

let subSubCategoryRouter = express.Router();
const path = require("path");
const { subSubCategoryCreate, subSubCategoryView, getParentCategory, subSubCategoryDelete, subSubCategoryUpdate, subSubCategoryChangeStatus, subSubCatSingleData } = require("../../controller/admin/subSubCategoryController");
const { getSubCategory } = require("../../controller/admin/subSubCategoryController");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subSubcategory')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })




subSubCategoryRouter.post("/add", upload.single("image"), subSubCategoryCreate);
subSubCategoryRouter.get("/view", subSubCategoryView);
subSubCategoryRouter.get("/parent", getParentCategory);
subSubCategoryRouter.get("/sub-category/:id", getSubCategory);

subSubCategoryRouter.get('/single/:id', subSubCatSingleData)
subSubCategoryRouter.post('/delete', subSubCategoryDelete)
subSubCategoryRouter.put('/update/:id', upload.single("image"), subSubCategoryUpdate)
subSubCategoryRouter.post('/change-status', subSubCategoryChangeStatus)



module.exports = subSubCategoryRouter;