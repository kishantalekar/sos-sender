import axios from "axios";

//http://10.0.2.2:3000
const createSmsMessage = (location, latitude, longitude, name, message) => {
  let body = `  My location is `;
  if (location?.district && location?.city && location?.street) {
    body += `${location.district} ${location.city} ${location.street}.`;
  } else if (location?.district && location?.city) {
    body += `${location.district} ${location.city}.`;
  } else if (location?.city && location?.street) {
    body += `${location.city} ${location.street}.`;
  } else if (location?.district && location?.street) {
    body += `${location.district} ${location.street}.`;
  } else if (location?.city) {
    body += `${location.city}.`;
  } else if (location?.district) {
    body += `${location.district}.`;
  } else if (location?.street) {
    body += `${location.street}.`;
  }

  const mapLink = `https://maps.google.com/maps?q=${latitude},${longitude}`;
  body += ` Click on the link to know my current address: ${mapLink}`;

  const msg = `Hey${name ? " this is " + name : ""}${
    message ? "\n" + message : ""
  }${body}`;

  return msg;
};
export const sendSMS = async (
  contact,
  message,
  location,
  latitude,
  longitude,
  name
) => {
  try {
    const msg = createSmsMessage(location, latitude, longitude, name, message);
    const numbers = contact.map((n) => n.mobile);
    console.log(msg, numbers);

    const response = await axios.post("https://sos-alert.onrender.com/sms", {
      to: numbers,
      message: msg,
    });
    console.log(response.data);

    if (response.status === 200) {
      console.log("SMS sent successfully");
      return response.data;
    } else {
      console.log("Failed to send SMS");
      // console.log(response);
    }
  } catch (error) {
    console.log("Error sending SMS:", error);
  }
};
