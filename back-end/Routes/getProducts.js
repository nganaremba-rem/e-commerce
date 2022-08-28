const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
  const file = fs.readFileSync("public/products.json", "utf-8");
  const fileObj = JSON.parse(file);
  res.json(fileObj);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync("public/products.json", "utf-8");
  const fileData = JSON.parse(file);
  const product = fileData.find((item) => item.id === id);
  res.json(product);
});

module.exports = router;
