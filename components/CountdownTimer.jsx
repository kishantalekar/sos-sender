import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useRef } from "react";

const CountdownTimer = ({
  countdownTime,
  setCountdownTime,
  handleCancel,
  isCancelled,
  sendSMS,
  setShowCountDownTimer,
}) => {
  useEffect(() => {
    if (countdownTime > 0 && !isCancelled) {
      const timer = setInterval(() => {
        setCountdownTime((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (countdownTime === 0) {
      setShowCountDownTimer(false);
      sendSMS(); // Execute the callback function when the countdown finishes
    }
  }, [countdownTime, isCancelled]);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 20 }}>
        {/* <ActivityIndicator size={"large"} color={"white"} /> */}

        <Text style={{ color: "#f2f2f2", fontSize: 100, fontWeight: 400 }}>
          {countdownTime}
        </Text>
        <Text style={{ color: "#f2f2f2", fontSize: 18, fontWeight: 500 }}>
          Seconds
        </Text>
      </View>
      <TouchableOpacity onPress={handleCancel}>
        <Text style={{ color: "#577ee5", fontWeight: 500, fontSize: 22 }}>
          CANCEL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountdownTimer;
