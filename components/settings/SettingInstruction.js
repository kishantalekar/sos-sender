import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SettingInstruction = ({ isInstruction, setIsInstruction }) => {
  const instructionArr = [
    "Register Your emergency contact numbers under Menu -> Register number.",
    "Press the SOS widget or the SOS Button on the homepage in case of an emergency. On pressing the button, an SOS message along with the link of your Current Location on Google Maps will be sent as an SMS to the registered numbers.",
    "We recommend you to always keep your GPS turned ON so that your device has enough information about your location in case of an emergency. This enables the app to fetch your location quickly. Otherwise, it may take a few more seconds (not more than 10 sec).",
    "We recommend you to use the SOS Alert widget and always keep your GPS turned ON. This allows you to send SOS Alerts in just one tap. You can adjust the size of the widget as per your requirements.",
    "SMS service charges will be applied by your service provider. Sufficient balance is required in your mobile to use this application.",
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={24}
          color="black"
          onPress={() => setIsInstruction((prev) => !prev)}
        />
        <Text
          style={{
            flex: 1,
            paddingLeft: 40,
            fontWeight: 500,
            fontSize: 20,
            fontFamily: "sans-serif",
          }}
        >
          INSTRUCTIONS
        </Text>
      </View>
      <View>
        {instructionArr.map((ins, i) => (
          <Text
            key={i}
            style={{
              fontWeight: 400,
              fontSize: 17,
              fontFamily: "sans-serif",
              paddingVertical: 10,
            }}
          >
            {i + 1}. {ins}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setIsInstruction((prev) => !prev)}
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          padding: 8,
          backgroundColor: "black",
          borderRadius: 15,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>GOT IT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingInstruction;
