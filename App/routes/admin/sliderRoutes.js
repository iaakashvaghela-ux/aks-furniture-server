let express = require("express");
const multer = require("multer");
const path = require("path");
const { sliderCreate, sliderView, sliderDelete, sliderUpdate, sliderChangeStatus, sliderSingleData } = require("../../controller/admin/sliderController");

let sliderRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/slider')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

sliderRouter.post("/add", upload.single("image"), sliderCreate);
sliderRouter.get("/view", sliderView);
sliderRouter.post('/delete', sliderDelete);
sliderRouter.put('/update/:id', upload.single("image"), sliderUpdate);
sliderRouter.post('/change-status', sliderChangeStatus);
sliderRouter.get('/single/:id', sliderSingleData);

module.exports = sliderRouter;
