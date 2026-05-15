const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productModel = require("../App/model/productModel");
const { createSlug } = require("../App/config/helper");

dotenv.config();

const rootDir = path.resolve(__dirname, "..", "..");
const sourceDir = path.join(rootDir, "images");
const uploadDir = path.resolve(__dirname, "..", "uploads", "product");
const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

const productTypes = ["Featured", "New Arrivals", "Onsale", ""];
const furnitureNames = [
  "Aurora Lounge Chair",
  "Velvet Cloud Sofa",
  "Marble Nest Table",
  "Oak Haven Console",
  "Luxe Dining Chair",
  "Noir Accent Table",
  "Artisan Coffee Table",
  "Royal Wing Chair",
  "Urban Storage Cabinet",
  "Classic Wooden Bench",
  "Modern TV Unit",
  "Signature Bedside Table",
  "Opal Fabric Sofa",
  "Crescent Arm Chair",
  "Maple Study Desk",
  "Ivory Center Table",
  "Heritage Bookshelf",
  "Zen Recliner",
  "Walnut Dining Table",
  "Studio Lounge Ottoman",
  "Pearl Sideboard",
  "Nordic Accent Stool",
  "Metro Shoe Cabinet",
  "Cedar Wardrobe",
  "Milan Bar Chair",
  "Orchid Dressing Table",
  "Ebony Nesting Stool",
  "Flora Console Table",
  "Aster Corner Sofa",
  "Monsta Crafted Chair"
];

const isImageFile = (fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName);

const makeProduct = (fileName, index) => {
  const productName = furnitureNames[index] || `Monsta Furniture ${index + 1}`;
  const actualPrice = 8999 + index * 750;
  const salePrice = actualPrice - 1000;
  const ext = path.extname(fileName).toLowerCase();
  const safeFileName = `seed-product-${String(index + 1).padStart(2, "0")}${ext}`;

  return {
    productName,
    productImage: safeFileName,
    backImage: safeFileName,
    galleryImage: [],
    productType: productTypes[index % productTypes.length],
    rating: 4 + (index % 10) / 10,
    isTopRated: index % 3 === 0 ? "Yes" : "No",
    isBestSelling: index % 4 === 0 ? "Yes" : "No",
    isUpsell: index % 5 === 0 ? "Yes" : "No",
    actualPrice,
    salePrice,
    stocks: 10 + (index % 20),
    order: index + 1,
    description: `${productName} is a curated furniture piece for modern homes, crafted to bring comfort, utility, and a premium Monsta finish into everyday living.`,
    slug: createSlug(productName),
    status: true,
    deleted_at: null
  };
};

const seedProducts = async () => {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Images folder not found: ${sourceDir}`);
  }

  fs.mkdirSync(uploadDir, { recursive: true });

  const imageFiles = fs
    .readdirSync(sourceDir)
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (!imageFiles.length) {
    throw new Error(`No images found in: ${sourceDir}`);
  }

  await mongoose.connect(mongoUri);

  let created = 0;
  let skipped = 0;

  for (const [index, fileName] of imageFiles.entries()) {
    const product = makeProduct(fileName, index);
    const sourcePath = path.join(sourceDir, fileName);
    const destinationPath = path.join(uploadDir, product.productImage);

    fs.copyFileSync(sourcePath, destinationPath);

    const existingProduct = await productModel.findOne({ slug: product.slug, deleted_at: null });
    if (existingProduct) {
      await productModel.updateOne({ _id: existingProduct._id }, { $set: product });
      skipped += 1;
      continue;
    }

    await productModel.create(product);
    created += 1;
  }

  console.log(`Images found: ${imageFiles.length}`);
  console.log(`Products created: ${created}`);
  console.log(`Products updated/skipped duplicates: ${skipped}`);
};

seedProducts()
  .catch((error) => {
    console.error("Product seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
