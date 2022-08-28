const router = require("express").Router();
const userDetail = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { email, index } = req.body;
  const position = `Address.${index}`;

  if (email && index) {
    const response = await userDetail.findOneAndUpdate(
      {
        Email: email,
      },
      {
        $unset: { [position]: 1 },
      },
    );
    if (response) {
      const resp = await userDetail.findOneAndUpdate(
        {
          Email: email,
        },
        {
          $pull: { Address: null },
        },
      );

      if (resp) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  }
});

module.exports = router;
