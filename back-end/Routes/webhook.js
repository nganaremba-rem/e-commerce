const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require("body-parser");

router.post("/", bodyParser.raw({ type: "application/json" }), (req, res) => {
  // console.log("Say Something");
  let payload = req.body;
  payload = JSON.stringify(payload);
  // console.log("Payload" + payload);
  const endPointKey =
    "whsec_51c5319db8377cfc229066e5f3f086d6dc593f2ede02475f4f58dd4d6802d228";
  const sig = req.headers["stripe-signature"];
  // console.log("Sig" + sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endPointKey);
    console.log("event: " + event);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // console.log(session);
  }
  res.sendStatus(200);
});

module.exports = router;
