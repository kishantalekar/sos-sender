const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const app = express();
// const multer = require("multer");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sms", (req, res) => {
  const { to, message } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

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
      console.log("All SMS sent");
      res.status(200).json(results); // Send the array of success/error messages
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      res.status(500).send("Failed to send SMS");
    });
});

const port = process.env.PORT; // Specify the port number you want to listen on

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
