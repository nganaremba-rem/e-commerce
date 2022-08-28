const router = require("express").Router();
const userDetail = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { email, ...address } = req.body;
  const allUser = await userDetail.find();
  const user = await allUser.find((user) => user.Email == email);
  console.log(address);
  if (user) {
    const result = await userDetail.updateOne(
      { Email: email },
      { $push: { Address: address } },
    );
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
});

module.exports = router;
