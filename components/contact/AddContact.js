import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const AddContact = ({
  active,
  setActive,
  name,
  setName,
  mobile,
  setMobile,
  handleAddContact,
  canAdd,
}) => {
  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: { width: 1.95, height: 1.95 },
          shadowOpacity: 1,
          shadowRadius: 2.6,
        }
      : {
          elevation: 5,
        };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.contactContainer]}>
        {/* <View
          style={{
            borderWidth: 0.8,
            borderBottomColor: "#b31b1a",
            marginBottom: 20,
          }}
        ></View> */}
        <TouchableOpacity
          style={[styles.addBtn, shadowStyle]}
          onPress={() => (canAdd ? setActive(!active) : null)}
        >
          <Ionicons name="person-add-outline" size={24} color="#404040" />
          <View>
            <Text style={styles.addText}>
              {canAdd ? "Add SOS Contacts" : "You can add only 5 contacts"}
            </Text>
          </View>
        </TouchableOpacity>
        {active ? (
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="gray"
                style={{ left: 25, zIndex: 10 }}
              />

              <TextInput
                placeholder="Nick Name..."
                value={name}
                onChangeText={(e) => setName(e)}
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderTopColor: "black",
                  borderBottomColor: "black",
                  backgroundColor: "#eff3f6",
                  borderRadius: 10,
                  paddingLeft: 30,
                  flex: 1,
                  paddingVertical: 10,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="mobile1"
                size={20}
                color="gray"
                style={{ left: 25, zIndex: 10 }}
              />

              <TextInput
                placeholder="+91......"
                value={mobile}
                onChangeText={(e) => setMobile(e)}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderTopColor: "black",
                  borderBottomColor: "black",
                  backgroundColor: "#eff3f6",
                  borderRadius: 10,
                  paddingLeft: 30,
                  flex: 1,
                  paddingVertical: 10,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                paddingHorizontal: 50,
                backgroundColor: "#b31b1a",
                backgroundColor: "#5fa6b9",
                borderRadius: 15,
                paddingVertical: 12,
              }}
              onPress={canAdd ? handleAddContact : null}
            >
              <Text
                style={{
                  // padding: 10,
                  color: "white",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    flex: 1,
  },
  headingContainer: {
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
  },
  contactContainer: {
    marginTop: 40,
    shadowColor: "rgba(0, 0, 0, 0.9)",
    shadowOffset: {
      width: 1.95,
      height: 1.95,
    },
    shadowOpacity: 1,
    shadowRadius: 2.6,

    borderRadius: 10,
    paddingVertical: 5,
  },
  addBtn: {
    flexDirection: "row",
    // backgroundColor: "#b31b1a",
    backgroundColor: "#b3deff",
    backgroundColor: "#cae1e8",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  addText: {
    fontSize: 19,
    fontWeight: 400,
    paddingLeft: 20,
    fontFamily: "sans-serif",
    color: "#333333",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  contactInfo: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    // justifyContent: "space-between",
  },
  removeBtn: {
    color: "#b31b1a",
    fontSize: 20,
    fontWeight: "500",
  },
});
export default AddContact;
