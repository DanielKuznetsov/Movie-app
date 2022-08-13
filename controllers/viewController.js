exports.getHomepage = function (req, res, next) {
  res.status(200).render("base");
};
