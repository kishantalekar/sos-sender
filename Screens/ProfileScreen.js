import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../styles/color";

import { getItem, setItem } from "../storage/storage";
import { USERNAME, USER_MOBILE_NUMBER } from "../constants/storage";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const ProfileScreen = () => {
  const [userName, setUserName] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const navigation = useNavigation();
  const toast = useToast();
  const handleSave = async () => {
    await setItem(USERNAME, userName);
    await setItem(USER_MOBILE_NUMBER, userMobileNumber);
    toast.show("Profile updated", { type: "success" });
    navigation.goBack();
  };
  useEffect(() => {
    const getUserData = async () => {
      const name = await getItem(USERNAME);
      const number = await getItem(USER_MOBILE_NUMBER);
      setUserName(JSON.parse(name));
      setUserMobileNumber(JSON.parse(number));
    };

    getUserData();
  }, []);
  return (
    <View
      style={{
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          //   backgroundColor: "gray",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            flex: 1,
            fontWeight: 400,
          }}
        >
          Edit Profile{" "}
        </Text>
      </View>
      <View
        style={{
          marginTop: 50,
          marginHorizontal: 20,
          gap: 20,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 400 }}>
            Enter your name{" "}
          </Text>
          <TextInput
            style={{
              borderWidth: 0.8,
              borderColor: color.shadeBlue,
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 15,
            }}
            value={userName}
            onChangeText={(e) => setUserName(e)}
          />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 400 }}>
            Enter your number
          </Text>
          <TextInput
            style={{
              borderWidth: 0.8,
              borderColor: color.shadeBlue,
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 15,
            }}
            value={userMobileNumber}
            onChangeText={(e) => setUserMobileNumber(e)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: color.shadeBlue,
            marginTop: 50,

            borderRadius: 20,
            paddingVertical: 18,
          }}
          onPress={handleSave}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
