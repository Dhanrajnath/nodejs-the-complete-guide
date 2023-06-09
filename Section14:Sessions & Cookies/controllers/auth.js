exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[2].trim().split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;

  // Optional req.session.save() method can be used to save the session manually
  // req.session.save((err) => {
  //   console.log(err);
  //   res.redirect("/");
  // });

  // res.setHeader("Set-Cookie", "loggedIn=true"); // 'loggedIn=true; Max-Age=10; [Secure/HttpOnly] ....
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
