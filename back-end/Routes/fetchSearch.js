const router = require("express").Router();
const fs = require("fs");

router.post("/", (req, res) => {
  let { searchTerm } = req.body;
  searchTerm = searchTerm.trim();
  const allProduct = fs.readFileSync("public/products.json", "utf-8");
  const allProductJson = JSON.parse(allProduct);
  const filtered = allProductJson.filter((product) => {
    const pattern = new RegExp(searchTerm, "gim");
    const getName = product.name.search(pattern);
    const getCategory = product.category.search(pattern);
    if (getName != -1 || getCategory != -1) return true;
    return false;
  });
  res.json(filtered);
});

module.exports = router;
