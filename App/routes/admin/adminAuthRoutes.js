let express = require("express");
const {
    adminLogin,
    adminCheckToken,
    adminProfile,
    adminProfileUpdate,
    adminPasswordUpdate,
    adminCompanyProfile,
    adminCompanyProfileUpdate
} = require("../../controller/admin/adminAuthController");
const { upload } = require("../../config/imageUpload");
let adminAuthRouter = express.Router();

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/check-token", adminCheckToken);
adminAuthRouter.get("/profile", adminProfile);
adminAuthRouter.put("/profile-update", upload.single("image"), adminProfileUpdate);
adminAuthRouter.put("/change-password", adminPasswordUpdate);
adminAuthRouter.get("/company-profile", adminCompanyProfile);
adminAuthRouter.put("/company-profile-update", upload.single("companyLogo"), adminCompanyProfileUpdate);
module.exports = adminAuthRouter;
