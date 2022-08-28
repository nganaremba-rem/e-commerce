const router = require("express").Router();
const userDetail = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { id, email } = req.body;
  const allUser = await userDetail.find();
  const user = allUser.find((user) => user.Email === email);

  await user.updateOne({ $pull: { Cart: { id: id } } });
  console.log("deleted");
  res.send();
});

module.exports = router;
