exports.getLogin = (req, res, next) => {
  console.log(req.session);
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[2].trim().split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true"); // 'loggedIn=true; Max-Age=10; [Secure/HttpOnly] ....
  res.redirect("/");
};
