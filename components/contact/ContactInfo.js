import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { clearAll } from "../../storage/storage";
import { AntDesign } from "@expo/vector-icons";
const ContactInfo = ({
  name,
  mobile,
  setContacts,
  homeScreenSetContact,
  removeContact,
}) => {
  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "rgba(0, 0, 0, 0.9)",
          shadowOffset: { width: 1.8, height: 1.8 },
          shadowOpacity: 0.5,
          shadowRadius: 5.6,
        }
      : {
          elevation: 5,
        };
  return (
    <View style={[styles.contactInfo, shadowStyle]}>
      <Image
        source={require("../../assets/naruto.jpeg")}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
        <Text style={{ color: "gray", fontWeight: "500" }}>{mobile}</Text>
      </View>
      <TouchableOpacity onPress={() => removeContact(mobile)}>
        {/* <Text style={styles.removeBtn}>remove</Text> */}
        <AntDesign name="delete" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  contactInfo: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    backgroundColor: "#dcebef",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  removeBtn: {
    color: "#b31b1a",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ContactInfo;
