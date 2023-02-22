const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const array_of_allowed_files = ["doc", "pdf", "docx"];

  if (array_of_allowed_files.includes(file_extension)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Type validation failed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/hirecv"));
  },
  filename: function (req, file, cb) {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const uniqueSuffix = `cv-${
      Date.now() + Math.round(Math.random() * 1e9)
    }.${file_extension}`;
    req.filename = uniqueSuffix;
    req.fileOrginalname = file.originalname;
    cb(null, uniqueSuffix);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 4000000 },
});
