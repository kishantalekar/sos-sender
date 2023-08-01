import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Foundation, AntDesign } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { getItem, setItem } from "../../storage/storage";
import {
  ALLOW_INFO_SHARE,
  USERNAME,
  USER_MOBILE_NUMBER,
} from "../../constants/storage";
import { useNavigation } from "@react-navigation/native";
const SettingInfo = ({ toggleInfo, setToggleInfo }) => {
  const [userName, setUserName] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const handleToggle = async (isOn) => {
    setToggleInfo((prev) => !prev);
    try {
      await setItem(ALLOW_INFO_SHARE, isOn);
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  useEffect(() => {
    const getUserData = async () => {
      const name = await getItem(USERNAME);
      console.log(name);
      const number = await getItem(USER_MOBILE_NUMBER);
      const toggle = await getItem(ALLOW_INFO_SHARE);
      setUserName(JSON.parse(name));
      setUserMobileNumber(JSON.parse(number));

      setToggleInfo(JSON.parse(toggle));
    };
    getUserData();
  }, []);
  useEffect(() => {}, []);
  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "gray", fontSize: 17, fontWeight: 400 }}>
          YOUR INFORMATION
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={{ color: "#4892a6", fontSize: 16, fontWeight: 500 }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          shadowColor: "rgba(0, 0, 0, 1)",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 8, // For Android
          backgroundColor: "#edeff7",
          padding: 10,
          borderRadius: 10,
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Ionicons name="person" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 18 }}>
            {userName ? userName : "Update Your Name"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Foundation
            name="telephone"
            size={24}
            color="#4e9cb1"
            style={{ paddingLeft: 5 }}
          />
          <Text style={{ fontSize: 18 }}>
            {userMobileNumber ? `+91${userMobileNumber}` : "Add Your Number"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AntDesign name="sharealt" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 18, flex: 1 }}>
            Allow The App to send your info
          </Text>
          <ToggleSwitch
            isOn={toggleInfo || false}
            onColor="#4e9cb1"
            offColor="#cae1e8"
            labelStyle={{
              color: "black",
              fontWeight: "900",
            }}
            size="small"
            onToggle={handleToggle}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingInfo;
