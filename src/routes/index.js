const express = require("express");
const router = express.Router();

//Services
const productService = require("../services/product");

//Controlers
const productController = require("../controllers/product");

router.get("/", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send({
    title: "Meli API test",
    version: "0.0.1"
  });
});
router.get("/items", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const result = await productService.get(req);
  if (result.error) return res.status(400).send({ error: "Error" });
  const data = productController.getData(result.data);
  res.send({ allProducts: data });
});
router.get("/items/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const result = await productService.getById(req);
  const resultDescription = await productService.getDescription(req);
  const data = productController.getProduct(
    result.data,
    resultDescription.data
  );
  if (result.error) return res.status(400).send({ error: "Error" });
  res.send({ product: data });
});

module.exports = router;
