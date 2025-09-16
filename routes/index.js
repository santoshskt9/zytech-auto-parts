
const Router = require("express").Router();
const { createContact, createQuote } = require("./controller");
const products = require("../data/products.json");

Router.get("/", async (req, res) => {
  res.render("index", { productCards: products });
});
Router.get("/about-us", async (req, res) => {
  res.render("about-us");
});
Router.get("/contact", async (req, res) => {
  res.render("contact");
});
Router.get("/terms-and-conditions", async (req, res) => {
  res.render("terms-and-conditions");
});
Router.get("/privacy-policy", async (req, res) => {
  res.render("privacy-policy");
});
Router.get("/cookies-policy", async (req, res) => {
  res.render("cookies-policy");
});
Router.get("/idd-policy", async (req, res) => {
  res.render("idd-policy");
});
Router.get("/terms-of-use", async (req, res) => {
  res.render("terms-of-use");
});
Router.get("/return-process", async (req, res) => {
  res.render("return-process");
});
Router.get("/complaints-procedure-information", async (req, res) => {
  res.render("complaints-procedure-information");
});
Router.get("/delivery-information", async (req, res) => {
  res.render("delivery-information");
});

Router.get("/request-quote", async (req, res) => {
  res.render("requestQuote");
});

Router.post("/contact", createContact);
Router.post("/quote", createQuote);

module.exports = Router;