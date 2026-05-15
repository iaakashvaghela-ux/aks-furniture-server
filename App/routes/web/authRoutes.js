let express = require("express");
const { authCreate, login, forgotPassword, changePassword, resetPassword, getUser, updateProfile } = require("../../controller/web/authController");


let authRouter = express.Router();

authRouter.post("/register", authCreate);
authRouter.post("/login", login);
authRouter.post("/change-password", changePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.put("/reset-password/:userId", resetPassword);
authRouter.post("/get-user", getUser);
authRouter.post("/update-profile", updateProfile);



module.exports = authRouter;