const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
  const array_of_allowed_file_types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];

  if (
    array_of_allowed_files.includes(file_extension) &&
    array_of_allowed_file_types.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Type validation failed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/images"));
  },
  filename: function (req, file, cb) {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const uniqueSuffix = `img-${
      Date.now() + Math.round(Math.random() * 1e9)
    }.${file_extension}`;
    req.filename = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 4000000 },
});
