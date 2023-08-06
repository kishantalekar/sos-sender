import axios from "axios";
import * as FileSystem from "expo-file-system";
import { BACKEND_SERVER_URL } from "@env";
//http://10.0.2.2:3000
const createSmsMessage = (
  location,
  latitude,
  longitude,
  name,
  message,
  imageUrl
) => {
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
  }${body}
  
  ${imageUrl ? "click here to see the emergencey image" : ""}`;

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
    const msg = createSmsMessage(
      location,
      latitude,
      longitude,
      name,
      message,
      false
    );
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

// export const sendImage = async (uri) => {
//   console.log(uri, "from inside");

//   try {
//     const uploadResult = await FileSystem.uploadAsync(
//       `${BACKEND_SERVER_URL}/image`,
//       uri,
//       {
//         httpMethod: "POST",
//         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
//         fieldName: "image",
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

export const sendImage = async (
  uri,
  contacts,
  message,
  location,
  latitude,
  longitude,
  name
) => {
  try {
    const apiUrl = `${BACKEND_SERVER_URL}/image`;
    const numbers = contacts.map((n) => n.mobile);
    let msg = createSmsMessage(
      location,
      latitude,
      longitude,
      name,
      message,
      true
    );
    console.log(msg);
    // Create a new FormData object
    const formData = new FormData();

    // Append the image to the FormData object with custom name and type
    formData.append("image", {
      uri,
      name: "image.jpg",
      type: "image/jpg",
    });

    // Add other parameters to the FormData object
    formData.append("to", JSON.stringify(numbers)); // Convert the array to JSON string
    formData.append("message", msg);

    // Send the POST request using the fetch API
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    // Check if the response is successful
    if (response.ok) {
      console.log("Image sent successfully");
      // Handle the response data if needed
      const data = await response.json();
      console.log(data);

      return data;
    } else {
      console.log("Failed to send image");
    }
  } catch (error) {
    console.error("Error sending image:", error);
  }
};
