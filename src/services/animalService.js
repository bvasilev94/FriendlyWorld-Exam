const Animal = require("../models/Animal.js");

exports.addAnimal = (animalData) => Animal.create(animalData);
exports.getAllAnimals = () => Animal.find().lean();
exports.getOneAnimal = (animalId) => Animal.findById(animalId).lean();
exports.updateAnimalInfo = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });
exports.deleteAnimal = (animalId) => Animal.findByIdAndDelete(animalId);
exports.donateToAnimal = async (animalId, donatorId) => {
  const animal = await Animal.findById(animalId);

  animal.donations.push({ donatorId });

  return animal.save();
};
exports.searchAnimal = async (location) => {
  let result = await Animal.find().lean();
  return result;
};
