const express = require("express");
const router = express.Router();
const userDetails = require("../model/userDetail");
const bcrypt = require("bcrypt");

// router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const allData = await userDetails.find();
  const check = allData.find((mail) => mail.Email === email);
  if (check) {
    res.json({ msg: "Email Already Exist" });
  } else {
    const hashPassword = await bcrypt.hash(req?.body?.password ?? "", 10);
    try {
      const user = await userDetails.create({
        Name: req.body.name,
        Email: req.body.email,
        Address: [
          {
            address: req.body.address,
            city: req.body.city,
            pin: req.body.pin,
            state: req.body.state,
          },
        ],
        PhoneNo: req.body.phone,
        Password: hashPassword,
      });
      res.status(201).json({ msg: "Sign Up Success" });
    } catch (e) {
      res.status(409).send(e.message);
    }
  }
});

module.exports = router;
