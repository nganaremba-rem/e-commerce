const router = require("express").Router();
const userDetails = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { user } = req.body;
  if (user) {
    const allData = await userDetails.find();

    const userMail = await allData.find((data) => user === data.Email);
    res.json({
      name: userMail?.Name,
      email: userMail?.Email,
    });
  }
});

module.exports = router;
