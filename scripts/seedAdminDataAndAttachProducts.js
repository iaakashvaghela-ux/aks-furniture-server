const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { createSlug } = require("../App/config/helper");

const categoryModel = require("../App/model/categoryModel");
const subCategoryModel = require("../App/model/subCategoryModel");
const subSubCategoryModel = require("../App/model/subSubCategoryModel");
const colorModel = require("../App/model/colorModel");
const materialsModel = require("../App/model/materialsModel");
const countryModel = require("../App/model/countryModel");
const faqModel = require("../App/model/faqModel");
const sliderModel = require("../App/model/sliderModel");
const whyChooseUsModel = require("../App/model/whyChooseUsModel");
const testimonialsModel = require("../App/model/testimonialsModel");
const productModel = require("../App/model/productModel");

dotenv.config();

const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

const categoryImages = [
  "image-1773128094122-907180482.png",
  "image-1773296480698-80469199.jpeg",
  "image-1774079873278-119246944.png",
  "image-1774080031600-977008005.png",
  "image-1774080059905-546992193.png",
  "image-1774097125782-686324069.jpeg"
];

const subCategoryImages = [
  "image-1773468775301-111062058.jpg",
  "image-1773468813325-624409590.jpg",
  "image-1773468887483-707757265.jpg",
  "image-1773468901285-796749096.jpg",
  "image-1773469044229-364318983.jpg",
  "image-1773469060312-600431850.jpg"
];

const subSubCategoryImages = [
  "image-1773728570562-272960963.jpeg",
  "image-1774117419436-773083013.png",
  "image-1774119588890-662876950.jpg",
  "image-1774161510545-713287377.jpeg",
  "image-1774161854456-593386041.jpeg",
  "image-1774162108338-990651051.jpeg"
];

const upsertBy = async (Model, filter, data) => {
  return Model.findOneAndUpdate(
    filter,
    { $set: data },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true, runValidators: false }
  );
};

const seedCategories = async () => {
  const categories = ["Sofa", "Chair", "Table", "Bed", "Storage", "Decor"];
  const created = [];

  for (const [index, name] of categories.entries()) {
    created.push(await upsertBy(
      categoryModel,
      { slug: createSlug(name), deleted_at: null },
      {
        name,
        slug: createSlug(name),
        image: categoryImages[index],
        order: index + 1,
        status: true,
        deleted_at: null
      }
    ));
  }

  return created;
};

const seedSubCategories = async (categories) => {
  const names = ["Lounge", "Dining", "Coffee", "Bedroom", "Cabinet", "Accent"];
  const created = [];

  for (const [index, name] of names.entries()) {
    const parent = categories[index % categories.length];
    created.push(await upsertBy(
      subCategoryModel,
      { name, parentCategory: String(parent._id), deleted_at: null },
      {
        name,
        parentCategory: String(parent._id),
        image: subCategoryImages[index],
        order: index + 1,
        status: true,
        deleted_at: null
      }
    ));
  }

  return created;
};

const seedSubSubCategories = async (categories, subCategories) => {
  const names = ["Modern", "Classic", "Luxury", "Wooden", "Compact", "Premium"];
  const created = [];

  for (const [index, name] of names.entries()) {
    const parent = categories[index % categories.length];
    const subCategory = subCategories[index % subCategories.length];
    created.push(await upsertBy(
      subSubCategoryModel,
      { name, subCategory: String(subCategory._id), deleted_at: null },
      {
        name,
        parentCategory: String(parent._id),
        subCategory: String(subCategory._id),
        image: subSubCategoryImages[index],
        order: index + 1,
        status: true,
        deleted_at: null
      }
    ));
  }

  return created;
};

const seedColors = async () => {
  const colors = [
    { colorName: "Black", code: "#111111" },
    { colorName: "White", code: "#f8f7f2" },
    { colorName: "Brown", code: "#7a4b2a" },
    { colorName: "Grey", code: "#8b8f92" },
    { colorName: "Blue", code: "#244f8f" },
    { colorName: "Green", code: "#386641" },
    { colorName: "Gold", code: "#d1a84f" },
    { colorName: "Beige", code: "#d8c3a5" }
  ];

  const created = [];
  for (const [index, color] of colors.entries()) {
    created.push(await upsertBy(
      colorModel,
      { colorName: color.colorName, deleted_at: null },
      { ...color, order: index + 1, status: true, deleted_at: null }
    ));
  }
  return created;
};

const seedMaterials = async () => {
  const materials = ["Wood", "Fabric", "Leather", "Metal", "Marble", "Glass", "Velvet", "Cane"];
  const created = [];

  for (const [index, name] of materials.entries()) {
    created.push(await upsertBy(
      materialsModel,
      { name, deleted_at: null },
      { name, order: index + 1, status: true, deleted_at: null }
    ));
  }

  return created;
};

const seedCountries = async () => {
  const countries = ["India", "USA", "Canada", "Australia", "UK"];
  for (const [index, name] of countries.entries()) {
    await upsertBy(countryModel, { name, deleted_at: null }, { name, order: index + 1, status: true, deleted_at: null });
  }
};

const seedFaqs = async () => {
  const faqs = [
    ["Do you offer custom furniture?", "Yes, selected products can be customized by size, finish, and material."],
    ["How long does delivery take?", "Standard delivery usually takes 5 to 10 business days depending on location."],
    ["Do products include warranty?", "Most furniture products include a standard workmanship warranty."],
    ["Can I return an item?", "Returns depend on product condition and return policy eligibility."]
  ];

  for (const [index, [question, answer]] of faqs.entries()) {
    await upsertBy(faqModel, { question, deleted_at: null }, { question, answer, order: index + 1, status: true, deleted_at: null });
  }
};

const seedMarketingContent = async () => {
  const sliders = [
    ["Luxury Furniture", "Transform your living space", "image-1774177363545-243464287.jpg", "/product"],
    ["Modern Comfort", "Curated pieces for refined homes", "image-1775276997248-962676332.png", "/product"],
    ["Artisan Collection", "Furniture with character and craft", "image-1775277021118-113394146.jpeg", "/product"]
  ];

  for (const [index, [title, subHeading, image, link]] of sliders.entries()) {
    await upsertBy(sliderModel, { slug: createSlug(title), deleted_at: null }, {
      title,
      subHeading,
      image,
      link,
      slug: createSlug(title),
      order: index + 1,
      status: true,
      deleted_at: null
    });
  }

  const whyChooseUs = [
    ["Premium Quality", "Durable furniture crafted with selected materials.", "image-1774534105323-868212120.jpg"],
    ["Fast Delivery", "Reliable doorstep delivery with careful packaging.", "image-1774534968412-55620646.jpg"],
    ["Expert Support", "Friendly assistance before and after your purchase.", "image-1774534970988-764183640.jpg"]
  ];

  for (const [index, [title, description, image]] of whyChooseUs.entries()) {
    await upsertBy(whyChooseUsModel, { title, deleted_at: null }, {
      title,
      description,
      image,
      order: index + 1,
      status: true,
      deleted_at: null
    });
  }

  const testimonials = [
    ["Kathy Young", "Interior Designer", 5, "The furniture quality is excellent and the designs feel premium.", "image-1774545307891-273699627.jpg"],
    ["Rahul Sharma", "Home Owner", 5, "My sofa and table arrived on time and look beautiful in my living room.", "image-1774545409149-462094190.jpg"],
    ["Neha Verma", "Architect", 4, "A reliable furniture store with tasteful collections and helpful support.", "image-1774546540640-69893520.png"]
  ];

  for (const [index, [name, designation, rating, message, image]] of testimonials.entries()) {
    await upsertBy(testimonialsModel, { name, deleted_at: null }, {
      name,
      designation,
      rating,
      message,
      image,
      order: index + 1,
      status: true,
      deleted_at: null
    });
  }
};

const attachProducts = async ({ categories, subCategories, subSubCategories, colors, materials }) => {
  const products = await productModel.find({ deleted_at: null }).sort({ order: 1 });

  for (const [index, product] of products.entries()) {
    const category = categories[index % categories.length];
    const subCategory = subCategories[index % subCategories.length];
    const subSubCategory = subSubCategories[index % subSubCategories.length];
    const productColors = [
      colors[index % colors.length]._id,
      colors[(index + 3) % colors.length]._id
    ];
    const productMaterials = [
      materials[index % materials.length]._id,
      materials[(index + 2) % materials.length]._id
    ];

    await productModel.updateOne(
      { _id: product._id },
      {
        $set: {
          parentCategory: category._id,
          subCategory: subCategory._id,
          subSubCategory: subSubCategory._id,
          color: productColors,
          material: productMaterials
        }
      }
    );
  }

  return products.length;
};

const seed = async () => {
  await mongoose.connect(mongoUri);

  const categories = await seedCategories();
  const subCategories = await seedSubCategories(categories);
  const subSubCategories = await seedSubSubCategories(categories, subCategories);
  const colors = await seedColors();
  const materials = await seedMaterials();

  await seedCountries();
  await seedFaqs();
  await seedMarketingContent();

  const attachedProducts = await attachProducts({ categories, subCategories, subSubCategories, colors, materials });

  console.log(`Categories: ${categories.length}`);
  console.log(`Sub categories: ${subCategories.length}`);
  console.log(`Sub sub categories: ${subSubCategories.length}`);
  console.log(`Colors: ${colors.length}`);
  console.log(`Materials: ${materials.length}`);
  console.log("Countries, FAQs, sliders, why choose us, testimonials seeded");
  console.log(`Products attached with master data: ${attachedProducts}`);
};

seed()
  .catch((error) => {
    console.error("Admin data seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
