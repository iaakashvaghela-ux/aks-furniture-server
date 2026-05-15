const testimonialsModel = require("../../model/testimonialsModel");

let viewTestimonials = async (req, res) => {
    try {
        let testimonials = await testimonialsModel.find({ status: true });
        res.status(200).json({ data: testimonials, path: process.env.TESTIMONIALSPATH, success: true, message: "Testimonials fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch testimonials", error: error.message });
    }
}

module.exports = { viewTestimonials };