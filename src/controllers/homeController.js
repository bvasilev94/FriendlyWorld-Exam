const router = require("express").Router();
const animalServices = require("../services/animalService.js");

router.get("/", async (req, res) => {
  const animals = await animalServices.getAllAnimals();
  if (animals.length > 3) {
    const lastThree = animals.slice(-3);
    res.render("home", { animals: lastThree });
  } else {
    res.render("home", { animals });
  }
});

module.exports = router;
