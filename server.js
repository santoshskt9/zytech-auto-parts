require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const hbs = require("hbs");
const Router = require("./routes");
// const APIRouter = require('./routes');
// const mongoose = require('mongoose');

// Connect to database
// const DB_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.PROD_DB
//     : process.env.LOCAL_DB;

// mongoose.set('strictQuery', false);

// const options = {
//   autoIndex: true, 
//   maxPoolSize: 10, 
//   serverSelectionTimeoutMS: 5000, 
//   socketTimeoutMS: 45000, 
//   family: 4 
// };

// mongoose
//   .connect(DB_URL, options)
//   .then(() => console.log(`Connected to ${process.env.NODE_ENV} database`))
//   .catch((err) => console.log("Error in database connection", err));

// ==========MiddleWares==========
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan("dev"));

//==============Static===========
app.use(express.static(path.join(__dirname, "public")));

//===========Views===========
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", {
  layout: path.join("layout", "main"),
});
hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.registerHelper("limit", function (arr, limit) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.slice(0, limit);
});

app.use("/", Router);
// app.use("/api", APIRouter);

app.use(function (req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`SERVER is running on the port ${PORT}`);
});

module.exports = app;
