import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Ionicons,
  Foundation,
  AntDesign,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

import {
  SettingAboutus,
  SettingInfo,
  SettingInstruction,
  SettingSOS,
} from "../components";
const SettingScreen = () => {
  const [toggleInfo, setToggleInfo] = useState(true);
  const [Countdown, setCountdown] = useState(0);
  const [isInstruction, setIsInstruction] = useState(false);
  return (
    <View
      style={{
        paddingTop: 70,
        paddingHorizontal: 20,
        backgroundColor: "#dce0ef",
        flex: 1,
      }}
    >
      {!isInstruction ? (
        <>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 500, fontSize: 20 }}>Settings</Text>
          </View>
          <SettingInfo toggleInfo={toggleInfo} setToggleInfo={setToggleInfo} />
          <SettingSOS Countdown={Countdown} setCountdown={setCountdown} />
          <SettingAboutus
            isInstruction={isInstruction}
            setIsInstruction={setIsInstruction}
          />
        </>
      ) : (
        <SettingInstruction
          isInstruction={isInstruction}
          setIsInstruction={setIsInstruction}
        />
      )}
    </View>
  );
};

export default SettingScreen;
