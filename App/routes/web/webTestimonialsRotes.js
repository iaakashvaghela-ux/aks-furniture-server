let testimonialsRouter = require("express").Router();
let { viewTestimonials } = require("../../controller/web/webTestimonialsController");

testimonialsRouter.get("/view", viewTestimonials);

module.exports = testimonialsRouter;
