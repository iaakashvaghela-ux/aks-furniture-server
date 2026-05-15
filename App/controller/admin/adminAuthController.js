const adminModel = require("../../model/adminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAdminIdFromToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ _status: false, _message: "Authorization token missing" });
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKENKEY);
        return decoded.userId;
    } catch (error) {
        res.status(401).json({ _status: false, _message: "Invalid authorization token" });
        return null;
    }
};

const adminProjection = "-password";

let adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let admin = await adminModel.findOne({ email });

        if (admin) {
           if (bcrypt.compareSync(password, admin.password)) {
             let token = jwt.sign({ userId: admin._id }, process.env.TOKENKEY)
             let obj = {
               _status: true,
               _message: "login successfull.... ",
               token
             }
       
       
             res.send(obj);
           } else {
             let obj = {
               _status: false,
               _message: "invalid password.... ",
             }
             res.send(obj);
           }
         } else {
           let obj = {
             _status: false,
             _message: "user not exist ",
       
           }
           res.send(obj);
         }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({_status: false, _message: "Internal server error", _data: [] });
    }
}

let adminCheckToken = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.TOKENKEY);
        let admin = await adminModel.findById(decoded.userId);
        if (admin) {
            let obj = {
                _status: true,
                _message: "token is valid.... ",
            }
            res.send(obj);
        } else {
            let obj = {
                _status: false,
                _message: "token is invalid.... ",
            }
            res.send(obj);
        }
    } catch (error) {
        console.error("Token Check Error:", error);
        res.status(500).json({_status: false, _message: "Internal server error", _data: [] });
    }
}

let adminProfile = async (req, res) => {
    try {
        const adminId = getAdminIdFromToken(req, res);
        if (!adminId) return;

        const admin = await adminModel.findById(adminId).select(adminProjection);
        if (!admin) {
            return res.status(404).json({ _status: false, _message: "Admin not found", _data: null });
        }

        res.status(200).json({
            _status: true,
            _message: "Profile fetched successfully",
            _data: admin,
            path: `${process.env.BASE_URL}uploads/admin/`
        });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ _status: false, _message: "Internal server error", _data: null });
    }
};

let adminProfileUpdate = async (req, res) => {
    try {
        const adminId = getAdminIdFromToken(req, res);
        if (!adminId) return;

        const { name, email, phone, gender } = req.body;
        const updateData = { name, email, phone, gender };

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined || updateData[key] === "") {
                delete updateData[key];
            }
        });

        if (req.file) {
            updateData.image = req.file.filename;
        }

        if (email) {
            const emailExists = await adminModel.findOne({ email, _id: { $ne: adminId } });
            if (emailExists) {
                return res.status(409).json({ _status: false, _message: "Email already in use" });
            }
        }

        if (phone) {
            const phoneExists = await adminModel.findOne({ phone, _id: { $ne: adminId } });
            if (phoneExists) {
                return res.status(409).json({ _status: false, _message: "Phone number already in use" });
            }
        }

        const admin = await adminModel.findByIdAndUpdate(
            adminId,
            updateData,
            { new: true, runValidators: false }
        ).select(adminProjection);

        if (!admin) {
            return res.status(404).json({ _status: false, _message: "Admin not found", _data: null });
        }

        res.status(200).json({
            _status: true,
            _message: "Profile updated successfully",
            _data: admin,
            path: `${process.env.BASE_URL}uploads/admin/`
        });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ _status: false, _message: "Internal server error", _data: null });
    }
};

let adminPasswordUpdate = async (req, res) => {
    try {
        const adminId = getAdminIdFromToken(req, res);
        if (!adminId) return;

        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ _status: false, _message: "All password fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ _status: false, _message: "New password and confirm password do not match" });
        }

        if (newPassword.length < 3) {
            return res.status(400).json({ _status: false, _message: "Password must be at least 3 characters" });
        }

        const admin = await adminModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ _status: false, _message: "Admin not found" });
        }

        const isCurrentPasswordValid = bcrypt.compareSync(currentPassword, admin.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ _status: false, _message: "Current password is incorrect" });
        }

        admin.password = bcrypt.hashSync(newPassword, 10);
        await admin.save({ validateBeforeSave: false });

        res.status(200).json({ _status: true, _message: "Password updated successfully" });
    } catch (error) {
        console.error("Password Update Error:", error);
        res.status(500).json({ _status: false, _message: "Internal server error" });
    }
};

let adminCompanyProfile = async (req, res) => {
    try {
        const adminId = getAdminIdFromToken(req, res);
        if (!adminId) return;

        const admin = await adminModel.findById(adminId).select([
            "companyLogo",
            "companyName",
            "companyAddress",
            "companyPhone",
            "companyEmail",
            "companyMap",
            "companyInstagram",
            "companyFacebook",
            "companyTwitter",
            "companyLinkedin"
        ]);

        if (!admin) {
            return res.status(404).json({ _status: false, _message: "Admin not found", _data: null });
        }

        res.status(200).json({
            _status: true,
            _message: "Company profile fetched successfully",
            _data: admin,
            path: `${process.env.BASE_URL}uploads/admin/`
        });
    } catch (error) {
        console.error("Company Profile Fetch Error:", error);
        res.status(500).json({ _status: false, _message: "Internal server error", _data: null });
    }
};

let adminCompanyProfileUpdate = async (req, res) => {
    try {
        const adminId = getAdminIdFromToken(req, res);
        if (!adminId) return;

        const {
            companyName,
            companyAddress,
            companyPhone,
            companyEmail,
            companyMap,
            companyInstagram,
            companyFacebook,
            companyTwitter,
            companyLinkedin
        } = req.body;

        const updateData = {
            companyName,
            companyAddress,
            companyPhone,
            companyEmail,
            companyMap,
            companyInstagram,
            companyFacebook,
            companyTwitter,
            companyLinkedin
        };

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        if (req.file) {
            updateData.companyLogo = req.file.filename;
        }

        const admin = await adminModel.findByIdAndUpdate(
            adminId,
            updateData,
            { new: true, runValidators: false }
        ).select(adminProjection);

        if (!admin) {
            return res.status(404).json({ _status: false, _message: "Admin not found", _data: null });
        }

        res.status(200).json({
            _status: true,
            _message: "Company profile updated successfully",
            _data: admin,
            path: `${process.env.BASE_URL}uploads/admin/`
        });
    } catch (error) {
        console.error("Company Profile Update Error:", error);
        res.status(500).json({ _status: false, _message: "Internal server error", _data: null });
    }
};

module.exports = {
    adminLogin,
    adminCheckToken,
    adminProfile,
    adminProfileUpdate,
    adminPasswordUpdate,
    adminCompanyProfile,
    adminCompanyProfileUpdate
}
