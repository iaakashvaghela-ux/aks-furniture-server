let express = require("express");
let cors = require("cors");
let dotenv = require("dotenv");
const adminRouter = require("./App/routes/adminRoutes");
const { default: mongoose } = require("mongoose");
const webRouter = require("./App/routes/webRoutes");
const { adminCreate } = require("./App/config/helper");


dotenv.config();

let App = express();

App.use(cors());
App.use(express.json());

// admin routes

App.use("/admin", adminRouter)
App.use("/uploads/category",express.static("uploads/category"))
App.use("/uploads/subcategory",express.static("uploads/subcategory"))
App.use("/uploads/subsubcategory",express.static("uploads/subsubcategory"))
App.use("/uploads/slider",express.static("uploads/slider"))
App.use("/uploads/whyChooseUs",express.static("uploads/whyChooseUs"))
App.use("/uploads/testimonials",express.static("uploads/testimonials"))
App.use("/uploads/product",express.static("uploads/product"))
// web routes 

App.use("/web-api",webRouter)

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
    .then((res) => {
        App.listen(process.env.PORT || 8000, async () => {
            console.log(`Server is running on port ${process.env.PORT}`);
            await adminCreate();
        });
    })

