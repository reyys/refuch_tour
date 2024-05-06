const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Refuch Mail API",
  });
});

app.post("/api/message", async (req, res) => {
  try {
    const { email, name, message } = req.body;
    await transporter.sendMail({
      from: "<refuch@reynaldo.fun>",
      to: "refuch@reynaldo.fun",
      subject: `Message - ${email}`,
      html: `
              <p>New message from : ${name}</p>
              <p>${message}</p>
          `,
    });
    res.json({ message: "Subscribed to our Newsletter" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    await transporter.sendMail({
      from: "<refuch@reynaldo.fun>",
      to: "refuch@reynaldo.fun",
      subject: `Newsletter - ${email}`,
      html: `<p>${email} just subscribed to newsletter !</p>`,
    });
    res.json({ message: "Subscribed to our Newsletter" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  `Listening to server...`;
});
