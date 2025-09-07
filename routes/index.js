
const Router = require("express").Router();
const { createContact } = require("./controller");

Router.get("/", async (req, res) => {
  res.render("index");
});
// Router.get("/contact", (req, res) => {
//   res.render("contact", {
//     message: "Contact Me Here",
//   });
// });
Router.post("/contact", createContact);
module.exports = Router;