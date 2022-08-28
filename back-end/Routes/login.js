const express = require("express");
const router = express.Router();
const userDetails = require("../model/userDetail");
const bcrypt = require("bcrypt");

router.use(express.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // const user = await userDetails.findOne({ Email: email, Password: password });
  const userArray = await userDetails.find();
  const user = userArray.find((user) => user.Email == email);
  if (await bcrypt.compare(password, user?.Password ?? "")) {
    res.json({ User: email });
  } else {
    res.status(500).json({ msg: "User not found" });
  }
});

module.exports = router;
