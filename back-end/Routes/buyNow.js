const router = require("express").Router();
const getProductById = require("../Functions/getProductById");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "cart") {
    const products = req.body;
    const productList = products.map((product) => getProductById(product.id));
    res.json(productList);
  } else {
    const myProduct = getProductById(id);
    const products = [myProduct];
    res.json(products);
  }
});

module.exports = router;
