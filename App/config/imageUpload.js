const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const fileToDataUri = (file) => {
  if (!file?.buffer || !file?.mimetype) return null;
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

const getFileDataUri = (files, fieldName) => {
  const file = files?.[fieldName]?.[0];
  return fileToDataUri(file);
};

const getFilesDataUri = (files, fieldName) => {
  return files?.[fieldName]?.map(fileToDataUri).filter(Boolean) || [];
};

module.exports = {
  upload,
  fileToDataUri,
  getFileDataUri,
  getFilesDataUri,
};
