const express = require("express");
const expressConfig = require("./config/express.js");
const handlebarsConfig = require("./config/handlebars.js");
const connectToDb = require("./config/database.js");
const router = require("./router.js");

const { PORT } = require("./utils/constants.js");

const app = express();

expressConfig(app);
handlebarsConfig(app);

connectToDb()
  .then(() => console.log("Connected to Database Succesfully"))
  .catch((err) => console.log("Connection to database error", err));

app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
