const router = require("express").Router();
const userDetail = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (email) {
    const allUser = await userDetail.find();

    const user = allUser.find((user) => user.Email == email);

    res.json(user);
  }
});

router.post("/carts", async (req, res) => {
  const { email } = req.body;
  if (email) {
    const allUser = await userDetail.find();
    const user = allUser.find((user) => user.Email == email);
    const carts = await user.Cart;
    res.json(carts);
  }
  res.json();
});

module.exports = router;
