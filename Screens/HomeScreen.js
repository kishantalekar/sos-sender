import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SendAlertComponent,
  Location,
  Header,
  AlertImage,
  ContextComponent,
} from "../components";
import { getContacts, getItem } from "../storage/storage";
import { sendSMS } from "../utils";
import CountdownTimer from "../components/CountdownTimer";
import { useToast } from "react-native-toast-notifications";
import {
  COUNTDOWN_TIMER,
  GET_ALL_CONTACTS,
  GET_SOS_MESSAGE,
  USERNAME,
} from "../constants/storage";

const HomeScreen = ({ contacts }) => {
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [showCountDownTimer, setShowCountDownTimer] = useState(false);
  const [countdownTime, setCountdownTime] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);
  const toast = useToast();

  const handleCancel = () => {
    setIsCancelled(true);
    setShowCountDownTimer(false);
  };

  useEffect(() => {
    //getting all the numbers from the contact screen using the state from navigation component
    const getAllNumbers = async () => {
      try {
        const numbers = contacts?.map((data) => data.mobile);
        setNumbers(numbers);
      } catch (error) {
        console.log(error);
      }
    };

    getAllNumbers();
  }, [contacts]);

  const handleSms = async () => {
    let data = await getItem(COUNTDOWN_TIMER);
    if (data == null) {
      data = 5;
    }
    setCountdownTime(data);
    setIsCancelled(false);
    setShowCountDownTimer(true);
  };

  const sendSmsAfterCountdown = async () => {
    try {
      const contacts = JSON.parse(await getItem(GET_ALL_CONTACTS));
      const msg = JSON.parse(await getItem(GET_SOS_MESSAGE));
      const name = JSON.parse(await getItem(USERNAME));

      // console.log(contacts, msg, location, latitude, longitude, "from ");
      const data = await sendSMS(
        contacts,
        msg,
        location,
        latitude,
        longitude,
        name,
        imageUri
      );
      console.log(data, "from homescreen");
      sendToast(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendToast = (data) => {
    try {
      data?.forEach((message) => {
        if (message.includes("SMS sent successfully")) {
          toast.show(message, {
            type: "success",
            placement: "bottom",
            animationType: "slide-in",
          });
        } else if (message.includes("Failed to send SMS")) {
          toast.show(message, {
            type: "danger",
            placement: "bottom",
            animationType: "slide-in",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {!showCountDownTimer ? (
        <>
          <Header />
          <SendAlertComponent sendAlert={handleSms} />
          {/* <AlertImage imageUri={imageUri} setImageUri={setImageUri} /> */}
          {/* <ContextComponent /> */}

          <Location
            location={location}
            longitude={longitude}
            latitude={latitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setLocation={setLocation}
          />
        </>
      ) : (
        <CountdownTimer
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
          handleCancel={handleCancel}
          isCancelled={isCancelled}
          sendSMS={sendSmsAfterCountdown}
          setShowCountDownTimer={setShowCountDownTimer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#edf5f7",
    flex: 1,
  },
});
export default HomeScreen;
