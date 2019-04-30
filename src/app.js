const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const path = require("path");

//Rotas
const index = require("./routes/index");
app.use("/", index);

module.exports = app;
