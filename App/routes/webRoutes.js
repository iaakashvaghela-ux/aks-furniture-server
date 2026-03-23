let express = require("express");
const authRouter = require("./web/authRoutes");

let webRouter = express.Router();


webRouter.use("/auth", authRouter)




module.exports = webRouter;