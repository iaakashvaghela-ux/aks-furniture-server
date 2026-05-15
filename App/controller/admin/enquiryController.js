const enquiryModel = require("../../model/enquiryModel");

let enquiryCreate = async (req, res) => {
    try {
        const enquiry = await enquiryModel.create(req.body);
        res.status(201).send({ _status: true, _message: "Enquiry Added", _data: enquiry });
    } catch (error) {
        res.status(400).send({ _status: false, _message: error.message });
    }
}

let enquiryView = async (req, res) => {
    try {
        const enquiries = await enquiryModel.find({ deleted_at: null }).sort({ createdAt: -1 });
        res.send({ _status: true, _message: "Enquiry View", _data: enquiries });
    } catch (error) {
        res.status(500).send({ _status: false, _message: error.message, _data: [] });
    }
}

let enquiryDelete = async (req, res) => {
    try {
        const { ids } = req.body;
        await enquiryModel.updateMany({ _id: { $in: ids } }, { $set: { deleted_at: new Date() } });
        res.send({ _status: true, _message: "Enquiry Delete" });
    } catch (error) {
        res.status(500).send({ _status: false, _message: error.message });
    }
}

let enquiryUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await enquiryModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ _status: true, _message: "Enquiry Update", _data: enquiry });
    } catch (error) {
        res.status(500).send({ _status: false, _message: error.message });
    }
}

let enquiryChangeStatus = async (req, res) => {
    try {
        const { ids } = req.body;
        await enquiryModel.updateMany({ _id: { $in: ids } }, [
            { $set: { status: { $not: "$status" } } }
        ]);
        res.send({ _status: true, _message: "Enquiry ChangeStatus" });
    } catch (error) {
        res.status(500).send({ _status: false, _message: error.message });
    }
}

module.exports={enquiryCreate,enquiryView,enquiryDelete,enquiryUpdate,enquiryChangeStatus}
