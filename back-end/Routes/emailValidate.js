const router = require("express").Router();
const userDetail = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (email) {
    const allUser = await userDetail.find();

    const user = await allUser.find((user) => user.Email === email);
    if (user) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
    return;
  }
});

module.exports = router;
