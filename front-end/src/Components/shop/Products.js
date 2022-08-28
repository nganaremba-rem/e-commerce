import React from "react";

export default async function products() {
  const products = await fetch("http://localhost:3001/getProducts");
  const productsJson = await products.json();
  return productsJson;
}
