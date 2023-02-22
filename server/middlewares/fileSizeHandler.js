const fileSizeHandler = (err, req, res, next) => {
  if (err) {
    res.status(413).json({
      message: "File size too large please make sure its below 1 MB",
      error: true,
      data: [],
    });
  } else {
    next();
  }
};
module.exports = fileSizeHandler;
