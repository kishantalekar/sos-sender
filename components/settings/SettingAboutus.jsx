import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { onLogOut } from "../../api/AuthApi";
import { auth } from "../../firebase";
import { clearAll } from "../../storage/storage";
const SettingAboutus = ({ isInstruction, setIsInstruction }) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await onLogOut();
    await clearAll();
    navigation.navigate("Login");
  };

  return (
    <View style={{ marginTop: 20, flex: 1, marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "gray", fontSize: 15, fontWeight: 400 }}>
          ABOUT US
        </Text>
        {/* <Text style={{ color: "#4892a6", fontSize: 16, fontWeight: 500 }}>
          privacy policies
        </Text> */}
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
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 20 }}
          onPress={() => setIsInstruction(true)}
        >
          {/* <Ionicons name="person" size={24} color="#4e9cb1" /> */}
          <AntDesign name="eyeo" size={22} color="#4e9cb1" />
          <Text style={{ fontSize: 14 }}>View Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Feather name="info" size={20} color="#4e9cb1" />
          <Text style={{ fontSize: 14 }}>About us</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Policy")}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {/* <Feather name="info" size={24} color="#4e9cb1" /> */}
        {/* <MaterialIcons name="privacy-tip" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 16 }}>Privacy Policies</Text>
        </TouchableOpacity>  */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {/* <Feather name="info" size={24} color="#4e9cb1" /> */}
          {/* <MaterialIcons name="privacy-tip" size={24} color="#4e9cb1" /> */}
          <MaterialCommunityIcons name="logout" size={24} color="#4e9cb1" />
          <Text
            style={{ fontSize: 16, fontFamily: "sans-serif", fontWeight: 400 }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingAboutus;
