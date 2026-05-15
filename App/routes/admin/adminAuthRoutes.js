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
const multer = require("multer");
const path = require("path");
const fs = require("fs");
let adminAuthRouter = express.Router();

const uploadDir = "uploads/admin";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/check-token", adminCheckToken);
adminAuthRouter.get("/profile", adminProfile);
adminAuthRouter.put("/profile-update", upload.single("image"), adminProfileUpdate);
adminAuthRouter.put("/change-password", adminPasswordUpdate);
adminAuthRouter.get("/company-profile", adminCompanyProfile);
adminAuthRouter.put("/company-profile-update", upload.single("companyLogo"), adminCompanyProfileUpdate);
module.exports = adminAuthRouter;
