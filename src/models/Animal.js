const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [2, "Name must be atleast 2 characters long"],
  },
  kind: {
    type: String,
    required: [true, "Animal kind is required!"],
    minLength: [3, "Animal kind must be atleast 3 characters long"],
  },
  imageUrl: {
    type: String,
    required: [true, "Animal photo is required"],
    match: [/^https?:\/\//, "Please enter valid Url"],
  },
  years: {
    type: Number,
    required: [true, "Age is required!"],
    min: [1, "Please enter a valid age betweeen 1 and 100"],
    max: [100, "Please enter a valid age betweeen 1 and 100"],
  },
  needs: {
    type: String,
    required: [true, 'Please enter what animal needs'],
    minLength: [3, 'Please enter a valid needs between 3 and 20 characters long'],
    maxLength: [20, 'Please enter a valid needs between 3 and 20 characters long']
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [5, 'Please enter a valid description between 5 and 50 characters long'],
    maxLength: [50, 'Please enter a valid description between 5 and 50 characters long']
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minLength: [5, 'Please enter a valid location between 5 and 15 characters long'],
    maxLength: [15, 'Please enter a valid location between 5 and 15 characters long']
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  donations: [
    {
      donatorId: {
        type: String,
        required: true,
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
