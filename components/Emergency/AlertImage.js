import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Evilcons from "react-native-vector-icons/EvilIcons";
const AlertImage = ({ imageUri, setImageUri }) => {
  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);
      setImageUri(result.uri);
      // uploadImage(result.uri);
    }
  };

  return (
    <View style={styles.ImageContainer}>
      {/* <Text style={styles.imageheading}>
        Capture what is going around you! and let your responders know
      </Text> */}
      <TouchableOpacity onPress={takeImage} style={styles.AddPhoto}>
        {!imageUri ? (
          <>
            <Evilcons name="camera" size={40} color={"gray"} />
            <Text style={{ fontWeight: 400, fontSize: 16 }}>Take a photo</Text>
          </>
        ) : (
          <Text>Photo Selected</Text>
        )}
      </TouchableOpacity>

      {/* <Text style={{ fontWeight: 400 }}>Add a Context </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageheading: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  AddPhoto: {
    borderColor: "gray",
    borderWidth: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 7,
    gap: 5,
  },
});
export default AlertImage;
