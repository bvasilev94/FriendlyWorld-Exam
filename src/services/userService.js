const User = require("../models/User.js");
const jwt = require("../utils/jwt.js");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/constants.js");

exports.register = (userData) => User.create(userData);
exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Wrong username or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Wrong username or password!");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });

  return token;
};
