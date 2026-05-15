const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const sliderModel = require("../App/model/sliderModel");
const { createSlug } = require("../App/config/helper");

dotenv.config();

const rootDir = path.resolve(__dirname, "..", "..");
const sourceDir = path.join(rootDir, "slider");
const uploadDir = path.resolve(__dirname, "..", "uploads", "slider");
const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

const sliderContent = [
  {
    title: "Art Nouveau Sofa",
    subHeading: "A statement sofa designed to bring sculptural elegance and refined comfort into your living room."
  },
  {
    title: "Designer Floor Lamp",
    subHeading: "Warm ambient lighting with a modern artistic edge for beautifully layered interiors."
  },
  {
    title: "Blue Lounge Chair",
    subHeading: "A calm, contemporary accent chair that adds color, comfort, and character to any corner."
  },
  {
    title: "Luxury Living Collection",
    subHeading: "Curated furniture pieces crafted for homes that value comfort, style, and lasting detail."
  },
  {
    title: "Signature Home Decor",
    subHeading: "Premium accents and furniture selections made to complete a polished modern space."
  }
];

const isImageFile = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

const makeSlider = (fileName, index) => {
  const content = sliderContent[index] || {
    title: `Monsta Slider ${index + 1}`,
    subHeading: "A curated furniture highlight for modern, comfortable homes."
  };
  const ext = path.extname(fileName).toLowerCase();
  const safeFileName = `seed-slider-${String(index + 1).padStart(2, "0")}${ext}`;

  return {
    ...content,
    image: safeFileName,
    link: "/product",
    slug: createSlug(content.title),
    order: index + 1,
    status: true,
    deleted_at: null
  };
};

const seedSliders = async () => {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Slider folder not found: ${sourceDir}`);
  }

  fs.mkdirSync(uploadDir, { recursive: true });

  const imageFiles = fs
    .readdirSync(sourceDir)
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (!imageFiles.length) {
    throw new Error(`No slider images found in: ${sourceDir}`);
  }

  await mongoose.connect(mongoUri);

  let created = 0;
  let updated = 0;

  for (const [index, fileName] of imageFiles.entries()) {
    const slider = makeSlider(fileName, index);
    const sourcePath = path.join(sourceDir, fileName);
    const destinationPath = path.join(uploadDir, slider.image);

    fs.copyFileSync(sourcePath, destinationPath);

    const existingSlider = await sliderModel.findOne({ slug: slider.slug, deleted_at: null });
    if (existingSlider) {
      await sliderModel.updateOne({ _id: existingSlider._id }, { $set: slider });
      updated += 1;
      continue;
    }

    await sliderModel.create(slider);
    created += 1;
  }

  console.log(`Slider images found: ${imageFiles.length}`);
  console.log(`Sliders created: ${created}`);
  console.log(`Sliders updated: ${updated}`);
};

seedSliders()
  .catch((error) => {
    console.error("Slider seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
