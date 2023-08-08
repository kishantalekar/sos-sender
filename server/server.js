const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
const multer = require("multer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  dest: "uploads/", // Specify the destination folder to store the uploaded images
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

cloudinary.config({
  cloud_name: "dqijooi9d",
  api_key: "924588659832885",
  api_secret: "im1LleITHEP8hwQiP-oPcp3DMbw",
});

app.post("/sms", (req, res) => {
  const { to, message } = req.body;

  // Send SMS to each number in the `to` array
  Promise.all(
    to.map((number) => {
      const formattedNumber = `+91${number}`;
      return client.messages
        .create({
          body: message,
          from: twilioNumber,
          to: formattedNumber,
        })
        .then((message) => {
          console.log(`SMS sent: ${message.sid}`);
          return `SMS sent successfully to ${formattedNumber}`; // Return a success message for each SMS
        })
        .catch((error) => {
          console.error("Error sending SMS:", error);
          return `Failed to send SMS to ${formattedNumber}`; // Return an error message for each failed SMS
        });
    })
  )
    .then((results) => {
      console.log("All sms sent");
      res.status(200).json(results); // Send the array of success/error messages
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      res.status(500).send("Failed to send SMS");
    });
});

app.post("/image", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { to, message } = req.body;

    console.log(message);

    const numbers = JSON.parse(to);
    const imageUrl = result.secure_url; // Cloudinary URL of the uploaded image

    // Send SMS to each number in the `numbers` array
    Promise.all(
      numbers.map((number) => {
        const formattedNumber = `+91${number}`;
        return client.messages
          .create({
            body: message,
            mediaUrl: imageUrl,
            from: twilioNumber,
            to: formattedNumber,
          })
          .then((message) => {
            console.log(`Image sent: ${message.sid}`);
            return `Image sent successfully to ${formattedNumber}`;
          })
          .catch((error) => {
            console.error("Error sending Image:", error);
            return `Failed to send Image to ${formattedNumber}`;
          });
      })
    )
      .then((results) => {
        console.log("All Images sent");
        res.status(200).json(results); // Send the array of success/error messages
      })
      .catch((error) => {
        console.error("Error sending media messages:", error);
        res.status(500).send("Failed to send media messages");
      });
  } catch (error) {
    console.log("Error parsing phone numbers:", error);
    res.status(400).send("Invalid phone numbers");
  }
});

app.post("/send-verification", async (req, res) => {
  console.log(req.body.phoneNumber);
  client.verify.v2
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({ to: `+919353167354`, channel: "sms" })
    .then((verification) => console.log(verification.status))
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });

  res.sendStatus(200);
});

app.post("/verify-otp", async (req, res) => {
  const check = await client.verify._v2
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: `+91${req.body.phoneNumber}`,
      code: req.body.otp,
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });

  res.status(200).send(check);
});

const port = process.env.PORT; // Specify the port number you want to listen on

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
