import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const privacyPolicyText = [
    "Our Commitment to Privacy and Security:",
    "Your security and privacy are of utmost importance to us. We take every measure to ensure that your personal information is protected and only shared with your designated emergency contacts.",
    "",
    "Join Us in Building a Safer Community:",
    "We believe in the strength of communities coming together to support and protect one another. Join our SOS Alert community, and together, let's create a safer environment for everyone.",
    "",
    "Contact Us:",
    "If you have any questions, feedback, or need assistance with our app, feel free to reach out to our customer support team. Your input is invaluable in helping us improve and enhance our services.",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      {privacyPolicyText.map((text, index) => (
        <Text key={index} style={styles.privacyPolicyText}>
          {text}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "sans-serif",
    marginBottom: 20,
  },
  privacyPolicyText: {
    fontWeight: "400",
    fontSize: 18,
    fontFamily: "sans-serif",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    gap: 20,
  },
  title: {
    flex: 1,
    paddingLeft: 40,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif",
  },
});

export default PrivacyPolicyScreen;
