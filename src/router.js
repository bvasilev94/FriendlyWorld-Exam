const router = require("express").Router();

const homeController = require("./controllers/homeController.js");
const userController = require("./controllers/userController.js");
const animalController = require("./controllers/animalController.js");

router.use(homeController);
router.use("/users", userController);
router.use("/animals", animalController);
router.use('*', (req,res) => {
    res.render('404')
})

module.exports = router;
