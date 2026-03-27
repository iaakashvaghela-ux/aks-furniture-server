let express = require("express");
const multer = require("multer");
const path = require("path");
const { testimonialsCreate, testimonialsView, testimonialsSingleData, testimonialsDelete, testimonialsUpdate, testimonialsChangeStatus } = require("../../controller/admin/testimonialsController");

let testimonialsRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/testimonials')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

testimonialsRouter.post("/add", upload.single("image"), testimonialsCreate);
testimonialsRouter.get("/view", testimonialsView);
testimonialsRouter.post('/delete', testimonialsDelete);
testimonialsRouter.put('/update/:id', upload.single("image"), testimonialsUpdate);
testimonialsRouter.post('/change-status', testimonialsChangeStatus);
testimonialsRouter.get('/single/:id', testimonialsSingleData);

module.exports = testimonialsRouter;
