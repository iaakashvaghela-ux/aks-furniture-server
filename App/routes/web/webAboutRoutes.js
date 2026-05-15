const aboutRouter = require("express").Router();
const {
  aboutPageData,
  aboutCompanyProfile,
  aboutWhyChooseUs,
  aboutTestimonials,
  createAboutEnquiry
} = require("../../controller/web/webAboutController");

aboutRouter.get("/page-data", aboutPageData);
aboutRouter.get("/company-profile", aboutCompanyProfile);
aboutRouter.get("/why-choose-us", aboutWhyChooseUs);
aboutRouter.get("/testimonials", aboutTestimonials);
aboutRouter.post("/enquiry", createAboutEnquiry);

module.exports = aboutRouter;
