const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lei.b.u.team@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
let otp;

router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  otp = Math.floor(1000 + Math.random() * 9999);
  const mailOptions = {
    from: "Lei B-U Team <lei.b.u.team@gmail.com>",
    to: `${email}`,
    subject: "Lei B-U OTP Verification",
    html: `<h3>Your OTP Verification code is: <br/> 
        <h1 style='color: red'>${otp}</span>
    </h4>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    if (info.rejected.length == 0) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(400);
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/verify", (req, res) => {
  const { otp: userOtp } = req.body;
  if (otp == userOtp) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
