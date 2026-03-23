let express = require("express");
const colorRouter = require("./admin/colorRoutes");
const userRouter = require("./admin/userRoutes");
const enquiryRouter = require("./admin/enquiryRoutes");
const materialsRouter = require("./admin/materiaRoutes");
const countryRouter = require("./admin/countryRoutes");
const faqRouter = require("./admin/faqRoutes");
const categoryRouter = require("./admin/categoryRoutes");
const subCategoryRouter = require("./admin/subCategoryRoutes");
const subSubCategoryRouter = require("./admin/subSubCategoryRoutes");
const sliderRouter = require("./admin/sliderRoutes");
let adminRouter = express.Router();

adminRouter.use("/color",colorRouter)
adminRouter.use("/country",countryRouter)
adminRouter.use("/faq",faqRouter)
adminRouter.use("/materials",materialsRouter)
adminRouter.use("/user",userRouter)
adminRouter.use("/enquiry",enquiryRouter)
adminRouter.use("/category",categoryRouter)
adminRouter.use("/sub-category",subCategoryRouter)
adminRouter.use("/sub-sub-category",subSubCategoryRouter)
adminRouter.use("/slider",sliderRouter)


module.exports = adminRouter;