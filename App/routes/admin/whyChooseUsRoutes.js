let express = require("express");
const multer = require("multer");
const path = require("path");
const { whyChooseUsCreate, whyChooseUsView, whyChooseUsSingleData, whyChooseUsDelete, whyChooseUsUpdate, whyChooseUsChangeStatus } = require("../../controller/admin/whyChooseUsController");

let whyChooseUsRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/whyChooseUs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

whyChooseUsRouter.post("/add", upload.single("image"), whyChooseUsCreate);
whyChooseUsRouter.get("/view", whyChooseUsView);
whyChooseUsRouter.post('/delete', whyChooseUsDelete);
whyChooseUsRouter.put('/update/:id', upload.single("image"), whyChooseUsUpdate);
whyChooseUsRouter.post('/change-status', whyChooseUsChangeStatus);
whyChooseUsRouter.get('/single/:id', whyChooseUsSingleData);

module.exports = whyChooseUsRouter;
