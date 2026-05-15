let express = require("express");
const authRouter = require("./web/authRoutes");
const productRouter = require("./web/webProductRoutes");
const homeRouter = require("./web/webHomeRoutes");
const cartRouter = require("./web/webCartRoutes");
const orderRouter = require("./web/orderRoutes");
const testimonialsRouter = require("./web/webTestimonialsRotes");
const wishlistRouter = require("./web/wishlistRoutes");
const aboutRouter = require("./web/webAboutRoutes");
  
let webRouter = express.Router();


webRouter.use("/auth", authRouter)
webRouter.use("/home", homeRouter)
webRouter.use("/products", productRouter)
webRouter.use("/cart", cartRouter)
webRouter.use("/wishlist", wishlistRouter)
webRouter.use("/order", orderRouter)
webRouter.use("/testimonials", testimonialsRouter)
webRouter.use("/about", aboutRouter)
module.exports = webRouter;
