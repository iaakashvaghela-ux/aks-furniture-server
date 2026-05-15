const adminModel = require("../../model/adminModel");
const enquiryModel = require("../../model/enquiryModel");
const testimonialsModel = require("../../model/testimonialsModel");
const whyChooseUsModel = require("../../model/whyChooseUsModel");

const defaultAboutContent = {
  hero: {
    title: "Our Legacy",
    highlight: "Legacy",
    description: "Crafting timeless spaces where comfort meets uncompromising elegance. Since 1998, we have been the silent architect of luxury living.",
    image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg"
  },
  story: {
    eyebrow: "Who We Are",
    title: "A Journey of Artisan Spirit.",
    descriptionOne: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.",
    descriptionTwo: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.",
    years: "25+",
    projects: "500+",
    mainImage: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg",
    secondaryImage: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg"
  },
  gallery: [
    {
      title: "Monsta Atelier",
      category: "Production",
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/dbfbc372-1550-40ef-a372-19566e1776b2-1671213170.jpg",
      span: "col-span-1 row-span-2"
    },
    {
      title: "Sustainable Sourcing",
      category: "Ethos",
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0eb1dffc-23c4-4a66-bb02-f5028e3658d3-1671213170.jpg",
      span: "col-span-1 row-span-1"
    },
    {
      title: "Precision Craft",
      category: "Design",
      image: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/028a3c98-0fb9-4fc0-8e7c-0076d254de41-1671213170.jpg",
      span: "col-span-1 row-span-1"
    }
  ]
};

const getCompanyProfile = async () => {
  const admin = await adminModel.findOne({}).select([
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

  return admin;
};

const aboutPageData = async (req, res) => {
  try {
    const [company, whyChooseUs, testimonials] = await Promise.all([
      getCompanyProfile(),
      whyChooseUsModel.find({ status: true, deleted_at: null }).sort({ order: 1 }),
      testimonialsModel.find({ status: true, deleted_at: null }).sort({ order: 1 })
    ]);

    res.status(200).json({
      _status: true,
      _message: "About page data fetched successfully",
      _data: {
        content: defaultAboutContent,
        company,
        whyChooseUs,
        testimonials
      },
      paths: {
        admin: `${process.env.BASE_URL}uploads/admin/`,
        whyChooseUs: `${process.env.BASE_URL}uploads/whyChooseUs/`,
        testimonials: `${process.env.BASE_URL}uploads/testimonials/`
      }
    });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message, _data: null });
  }
};

const aboutCompanyProfile = async (req, res) => {
  try {
    const company = await getCompanyProfile();
    res.status(200).json({
      _status: true,
      _data: company,
      path: `${process.env.BASE_URL}uploads/admin/`
    });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message, _data: null });
  }
};

const aboutWhyChooseUs = async (req, res) => {
  try {
    const whyChooseUs = await whyChooseUsModel.find({ status: true, deleted_at: null }).sort({ order: 1 });
    res.status(200).json({
      _status: true,
      _data: whyChooseUs,
      path: `${process.env.BASE_URL}uploads/whyChooseUs/`
    });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message, _data: [] });
  }
};

const aboutTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialsModel.find({ status: true, deleted_at: null }).sort({ order: 1 });
    res.status(200).json({
      _status: true,
      _data: testimonials,
      path: `${process.env.BASE_URL}uploads/testimonials/`
    });
  } catch (error) {
    res.status(500).json({ _status: false, _message: error.message, _data: [] });
  }
};

const createAboutEnquiry = async (req, res) => {
  try {
    const enquiry = await enquiryModel.create(req.body);
    res.status(201).json({
      _status: true,
      _message: "Thank you for your enquiry. We will get back to you soon.",
      _data: enquiry
    });
  } catch (error) {
    res.status(400).json({ _status: false, _message: error.message, _data: null });
  }
};

module.exports = {
  aboutPageData,
  aboutCompanyProfile,
  aboutWhyChooseUs,
  aboutTestimonials,
  createAboutEnquiry
};
