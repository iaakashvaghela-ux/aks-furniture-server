let express = require("express");
const multer = require("multer");

let subCategoryRouter = express.Router();
const path = require("path");
const { subCategoryCreate, subCategoryView, getParentCategory, subCategoryDelete, subCategoryUpdate, subCategoryChangeStatus, subCatSingleData } = require("../../controller/admin/subCategoryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subcategory')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })




subCategoryRouter.post("/add", upload.single("image"), subCategoryCreate);
subCategoryRouter.get("/view",subCategoryView);
subCategoryRouter.get("/parent",getParentCategory);
subCategoryRouter.get("/single/:id", subCatSingleData)
subCategoryRouter.post('/delete', subCategoryDelete)
subCategoryRouter.put('/update/:id', upload.single("image"), subCategoryUpdate)
subCategoryRouter.post('/change-status', subCategoryChangeStatus)



module.exports = subCategoryRouter;