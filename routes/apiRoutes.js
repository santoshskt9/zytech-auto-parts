const APIRouter = require("express").Router();
const { createContact } = require("./controller");

APIRouter.post("/contact", createContact)

module.exports = APIRouter;
