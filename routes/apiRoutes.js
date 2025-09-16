const APIRouter = require("express").Router();
const { createContact, createQuote } = require("./controller");

APIRouter.post("/contact", createContact);
APIRouter.post("/quote", createQuote);

module.exports = APIRouter;
