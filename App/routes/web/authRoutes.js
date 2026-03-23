let express = require("express");
const { authCreate, login, forgotPassword, changePassword } = require("../../controller/web/authController");


let authRouter = express.Router();

authRouter.post("/create", authCreate);
authRouter.post("/login", login);
authRouter.post("/change-password", changePassword);
authRouter.post("/forgot-password", forgotPassword);






module.exports = authRouter;