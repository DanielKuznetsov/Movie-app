exports.getHomepage = function (req, res, next) {
  res.status(200).render("base");
};

exports.getLoginPage = function (req, res, next) {
  res.status(200).render("login", {
    title: "Login Page",
  });
};

exports.getSignupPage = function (req, res, next) {
  res.status(200).render("signup", {
    title: "Login Page",
  });
};
