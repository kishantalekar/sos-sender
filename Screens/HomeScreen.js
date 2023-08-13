import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SendAlertComponent,
  Location,
  Header,
  AlertImage,
  ContextComponent,
} from "../components";
import { getContacts, getItem } from "../storage/storage";
import { sendImage, sendSMS } from "../utils";
import CountdownTimer from "../components/CountdownTimer";
import { useToast } from "react-native-toast-notifications";
import {
  COUNTDOWN_TIMER,
  GET_ALL_CONTACTS,
  GET_SOS_MESSAGE,
  USERNAME,
  USER_MOBILE_NUMBER,
} from "../constants/storage";
import ToastComponent from "../components/toastComponent";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ contacts }) => {
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [showCountDownTimer, setShowCountDownTimer] = useState(false);
  const [countdownTime, setCountdownTime] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
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
    const contacts = JSON.parse(await getItem(GET_ALL_CONTACTS));
    if ((contacts && contacts?.length == 0) || contacts == null) {
      return alert("Add Contacts Before sending sms");
    }
    let data = await getItem(COUNTDOWN_TIMER);
    if (data == null || data == undefined || data > 20) {
      data = 5;
    }

    if (data < 2) {
      data = 3;
    }
    setCountdownTime(data);
    setIsCancelled(false);
    setShowCountDownTimer(true);
  };

  const sendSmsAfterCountdown = async () => {
    setLoading(true);
    try {
      const contacts = JSON.parse(await getItem(GET_ALL_CONTACTS));
      const msg =
        JSON.parse(await getItem(GET_SOS_MESSAGE)) ||
        "Help me! its an emergency i am at the below location Please Help me.";
      const name = JSON.parse(await getItem(USERNAME)) || "mandeep";

      // console.log(contacts, msg, location, latitude, longitude, "from ");
      if (name == undefined || name == null || name.length < 0) {
        return alert("Please edit your name");
      }
      if (msg == undefined || msg == null || msg.length < 0) {
        return alert("Looks like your msg is empty");
      }
      if (imageUri) {
        try {
          const imageData = await sendImage(
            imageUri,
            contacts,
            msg,
            location,
            latitude,
            longitude,
            name
          );
          sendToast(imageData);
        } catch (error) {
        } finally {
          setImageUri("");
        }
      } else {
        const data = await sendSMS(
          contacts,
          msg,
          location,
          latitude,
          longitude,
          name,
          imageUri
        );

        sendToast(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  let id = null;
  const handleToastClicked = () => {
    toast.hide(id);
    navigation.navigate("Profile");
  };

  useEffect(() => {
    const checkProfileUpdate = async () => {
      const name = await getItem(USERNAME);
      const number = await getItem(USER_MOBILE_NUMBER);

      if (!name || !number) {
        setTimeout(() => {
          id = toast.show(<ToastComponent handelClick={handleToastClicked} />, {
            type: "warning",
            animationType: "slide-in",
            duration: 8000,
          });
        }, 10000);
      }
    };
    checkProfileUpdate();
  }, []);
  // console.log(imageUri);

  return (
    <View style={styles.container}>
      {!showCountDownTimer ? (
        <>
          <Header />
          <SendAlertComponent sendAlert={handleSms} loading={loading} />
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
