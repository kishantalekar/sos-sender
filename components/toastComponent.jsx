import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default CustomToastUpdateProfile = ({ handelClick }) => (
  <View style={styles.container}>
    <Text style={styles.message}>Your Profile is not updated. </Text>
    <TouchableOpacity onPress={handelClick}>
      <Text style={styles.updateText}>Update Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#ffdad2", // You can choose your desired background color
    // padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  message: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  updateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
