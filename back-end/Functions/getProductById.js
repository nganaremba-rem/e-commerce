const fs = require("fs");

const getProductById = (id) => {
  const products = fs.readFileSync("public/products.json", "utf-8");
  const productsJson = JSON.parse(products);
  const myProduct = productsJson.find((item) => item.id === id);
  return myProduct;
};

module.exports = getProductById;
