import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AboutUsScreen = () => {
  const navigation = useNavigation();

  const keyFeatures = [
    "Quick SOS Alerts: With just one tap of a button, you can send an SOS alert to your pre-registered emergency contacts. Our app will automatically send an SMS with your location details, ensuring your loved ones are informed about your situation.",
    "Location Sharing: Our app utilizes GPS technology to provide real-time location sharing with your emergency contacts. This enables them to track your whereabouts and come to your aid promptly.",
    "Customizable Contacts: You have the freedom to choose and personalize your emergency contacts list. Add your family members, friends, or any trusted individuals who can assist you during emergencies.",
    "Countdown Timer: For situations where you may not be able to tap the SOS button immediately, our app allows you to set a countdown timer. If the timer expires without being canceled, an SOS alert will be sent automatically.",
    "Safety Tips and Resources: We provide valuable safety tips and resources to help you prepare for emergencies and make informed decisions during critical moments.",
  ];

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>About Us - SOS Alert App</Text>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.paragraph}>
          Welcome to our SOS Alert App, where your safety is our top priority.
          Our mission is to provide you with a reliable and efficient tool to
          seek immediate help and assistance during emergencies. Whether you
          find yourself in a dangerous situation or need urgent medical aid, our
          app is designed to connect you with your chosen emergency contacts
          instantly.
        </Text>

        <Text style={styles.heading}>Key Features:</Text>
        {keyFeatures.map((feature, index) => {
          const [featureTitle, featureDescription] = feature.split(": ");
          return (
            <Text key={index} style={styles.feature}>
              <Text style={styles.featureTitle}>{featureTitle}:</Text>{" "}
              {featureDescription}
            </Text>
          );
        })}

        <Text style={styles.heading}>Privacy Policy:</Text>
        {privacyPolicyText.map((text, index) => (
          <Text key={index} style={styles.privacyPolicyText}>
            {text}
          </Text>
        ))}

        <Text style={styles.thankYouText}>
          Thank you for choosing SOS Alert App, your safety companion in times
          of need. Stay safe, stay connected!
        </Text>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.gotItButton}
      >
        <Text style={styles.gotItButtonText}>GOT IT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    paddingLeft: 40,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif",
  },
  paragraph: {
    fontWeight: "400",
    fontSize: 17,
    fontFamily: "sans-serif",
    paddingVertical: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "sans-serif",
    paddingVertical: 10,
  },
  feature: {
    fontWeight: "400",
    fontSize: 17,
    fontFamily: "sans-serif",
    paddingVertical: 10,
  },
  featureTitle: {
    fontWeight: "bold",
  },
  privacyPolicyText: {
    fontWeight: "400",
    fontSize: 17,
    fontFamily: "sans-serif",
    paddingVertical: 10,
  },
  thankYouText: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
    marginVertical: 20,
    paddingBottom: 20,
  },
  gotItButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 8,
    backgroundColor: "black",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  gotItButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default AboutUsScreen;
