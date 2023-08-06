import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

//https://dribbble.com/shots/9146048-HelpRail-App/attachments/1195621?mode=media
const SendAlertComponent = ({ sendAlert, loading }) => {
  const handleAlert = async () => {
    try {
      sendAlert();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.emergencyText}>Are you in emergency?</Text>
      <Text style={styles.desc}>
        Press the button below and help will reach soon.
      </Text>
      <View style={styles.alertContainer}></View>
      <View style={styles.alert3}>
        <View style={styles.alert2}>
          <View style={styles.alert1}>
            <TouchableOpacity style={styles.alert} onPress={handleAlert}>
              {loading ? (
                <>
                  <ActivityIndicator color={"white"} />
                </>
              ) : (
                <Text style={styles.alertText}>HELP ME!</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    // flex: 1,
  },
  emergencyText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  desc: {
    color: "gray",
    fontSize: 14,
    padding: 10,
  },
  alertContainer: {
    marginTop: 30,
  },
  alertText: {
    color: "white",
    fontSize: 22,
    fontWeight: 500,
  },
  alert: {
    backgroundColor: "#f62800",
    borderRadius: 500,
    color: "white",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  alert1: {
    backgroundColor: "#fcbaac",
    width: 200,
    height: 200,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  alert2: {
    backgroundColor: "#ffdad2",
    width: 240,
    height: 240,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  alert3: {
    backgroundColor: "#fff4f2",
    width: 280,
    height: 280,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SendAlertComponent;
