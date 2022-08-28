const router = require("express").Router();
const userDetail = require("../model/userDetail");
const fs = require("fs");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/", async (req, res) => {
  if (req.body.id && req.body.quantity) {
    const { email, id, quantity } = req.body;
    const products = fs.readFileSync("public/products.json", "utf-8");
    const productsJson = JSON.parse(products);
    const myProduct = productsJson.find((prod) => prod.id === id);
    const productName = myProduct.name;
    const productPrice = myProduct.price;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: productName,
            },
            unit_amount: parseFloat(productPrice * 100),
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/${id}/${quantity}/confirmationPage`,
      cancel_url: `http://localhost:3000/shop/${id}/${quantity}/buyNow`,
    });
    res.json({ url: session });
  } else {
    const { email } = req.body;
    const user = await userDetail.findOne({ Email: email });
    const cart = user.Cart;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((prod) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: prod.name,
            },
            unit_amount: parseFloat(prod.price * 100),
          },
          quantity: prod.quantity,
        };
      }),
      mode: "payment",
      success_url: "http://localhost:3000/cart/products/confirmationPage",
      cancel_url: "http://localhost:3000/shop/cart/products/buyNow",
    });
    // console.log(session);
    // const invoice = await stripe.invoices.create({
    //   customer: session.id,
    // });
    // console.log("Invoice : " + invoice);
    res.json({ url: session });
  }
});

module.exports = router;
