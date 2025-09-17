
const Router = require("express").Router();
const { createContact, createQuote } = require("./controller");
const products = require("../data/products.json");
const meta = require("../seometa.json");

Router.get("/", async (req, res) => {
  res.render("index", { productCards: products, meta: meta.pages["home"]});
});
Router.get("/about-us", async (req, res) => {
  res.render("about-us", {meta: meta.pages["about-us"]});
});
Router.get("/contact", async (req, res) => {
  res.render("contact", {meta: meta.pages["contact"]});
});
Router.get("/terms-and-conditions", async (req, res) => {
  res.render("terms-and-conditions", {meta: meta.pages["terms-and-conditions"]});
});
Router.get("/privacy-policy", async (req, res) => {
  res.render("privacy-policy", {meta: meta.pages["privacy-policy"]});
});
Router.get("/cookies-policy", async (req, res) => {
  res.render("cookies-policy", {meta: meta.pages["cookies-policy"]});
});
Router.get("/idd-policy", async (req, res) => {
  res.render("idd-policy", {meta: meta.pages["idd-policy"]});
});
Router.get("/terms-of-use", async (req, res) => {
  res.render("terms-of-use", {meta: meta.pages["terms-of-use"]});
});
Router.get("/return-process", async (req, res) => {
  res.render("return-process", {meta: meta.pages["return-process"]});
});
Router.get("/complaints-procedure-information", async (req, res) => {
  res.render("complaints-procedure-information", {meta: meta.pages["complaints-procedure-information"]});
});
Router.get("/delivery-information", async (req, res) => {
  res.render("delivery-information", {meta: meta.pages["delivery-information"]});
});

Router.get("/request-quote", async (req, res) => {
  res.render("requestQuote", {meta: meta.pages["request-quote"]});
});

Router.post("/contact", createContact);
Router.post("/quote", createQuote);

module.exports = Router;