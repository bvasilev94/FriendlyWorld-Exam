const router = require("express").Router();
const userServices = require("../services/userService.js");
const { extractErrMessages } = require("../utils/errorsHandler.js");
const { isAuth } = require("../middlewares/authentication.js");

router.get("/register", isAuth, (req, res) => {
  res.render("users/register");
});

router.post("/register", isAuth, async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  try {
    await userServices.register({ email, password, repeatPassword });
    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrMessages(error);
    res.render("users/register", { errorMessages });
  }
});

router.get("/login", isAuth, (req, res) => {
  res.render("users/login");
});

router.post("/login", isAuth, async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userServices.login(email, password);

    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errorMessages = ["Incorrect username or password"];
    res.status(404).render("users/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
