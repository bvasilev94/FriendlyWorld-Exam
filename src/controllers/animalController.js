const router = require("express").Router();
const animalServices = require("../services/animalService.js");
const { extractErrMessages } = require("../utils/errorsHandler.js");
const { checkDonationStatus } = require("../utils/checkIfAlreadyDonated.js");
const { isNotAuth } = require("../middlewares/authentication.js");

router.get("/dashboard", async (req, res) => {
  try {
    const animals = await animalServices.getAllAnimals();
    res.render("animals/dashboard", { animals });
  } catch (error) {
    res.redirect("/404");
  }
});

router.get("/add-animal", isNotAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/add-animal", isNotAuth, async (req, res) => {
  const { ...animalData } = req.body;
  animalData.owner = req.user._id;
  try {
    await animalServices.addAnimal(animalData);
    res.redirect("/animals/dashboard");
  } catch (error) {
    const errorMessages = extractErrMessages(error);
    res.status(404).render("animals/create", { errorMessages });
  }
});

router.get("/search", async (req, res) => {
  try {
    const animals = await animalServices.getAllAnimals();
    res.render("animals/search", { animals });
  } catch (error) {}
});

router.post("/search", async (req, res) => {
  const { location } = req.body;
  try {
    let animals = await animalServices.getAllAnimals();
    const filtered = animals.filter((animal) =>
      animal.location.toLowerCase().includes(location.toLowerCase())
    );
    res.render("animals/search", { animals: filtered });
  } catch (error) {
    res.redirect("/404");
  }
});

router.get("/details/:animalId", async (req, res) => {
  const animalId = req.params.animalId;
  try {
    const animal = await animalServices.getOneAnimal(animalId);

    const isOwner = req.user?._id === animal.owner?._id.toString();
    const isDonator = checkDonationStatus(animal.donations, req.user?._id);

    res.render("animals/details", { animal, isOwner, isDonator });
  } catch (error) {
    res.redirect("/404");
  }
});

router.get("/details/:animalId/edit", isNotAuth, async (req, res) => {
  const animalId = req.params.animalId;
  try {
    const animal = await animalServices.getOneAnimal(animalId);
    res.render("animals/edit", { animal });
  } catch (error) {
    res.redirect("/404");
  }
});

router.post("/details/:animalId/edit", isNotAuth, async (req, res) => {
  const { ...animal } = req.body;
  const animalId = req.params.animalId;
  try {
    await animalServices.updateAnimalInfo(animalId, animal);
    res.redirect(`/animals/details/${animalId}`);
  } catch (error) {
    const errorMessages = extractErrMessages(error);
    res.render("animals/edit", { animal, errorMessages });
  }
});

router.get("/details/:animalId/delete", isNotAuth, async (req, res) => {
  try {
    const animalId = req.params.animalId;
    await animalServices.deleteAnimal(animalId);
    res.redirect("/animals/dashboard");
  } catch (error) {
    res.redirect("/404");
  }
});

router.get("/details/:animalId/donate", isNotAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const donatorId = req.user._id;
  try {
    await animalServices.donateToAnimal(animalId, donatorId);
    res.redirect(`/animals/details/${animalId}`);
  } catch (error) {
    res.redirect("404");
  }
});

module.exports = router;
