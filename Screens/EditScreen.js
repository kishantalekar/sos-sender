import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { color } from "../styles/color";
import { getItem, setItem } from "../storage/storage";
import { GET_SOS_MESSAGE } from "../constants/storage";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
const EditScreen = () => {
  const [sosMessage, setSosMessage] = useState(
    "Help me! its an emergency i am at the below location Please Help me."
  );
  const toast = useToast();
  const navigation = useNavigation();
  useEffect(() => {
    const getSosMessage = async () => {
      const data = await getItem(GET_SOS_MESSAGE);
      console.log(data, "from");
      if (data) setSosMessage(JSON.parse(data));
    };
    getSosMessage();
  }, []);
  const handleSave = async () => {
    try {
      const data = await setItem(GET_SOS_MESSAGE, sosMessage);
      toast.show("SOS Message Edited Successfully", {
        type: "success",
        placement: "bottom",
        animationType: "zoom-in",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          Edit SOS message
        </Text>
      </View>
      <View style={{ marginTop: 40, gap: 20 }}>
        <Text>Edit and preview your SOS message here</Text>

        <View
          style={{
            borderWidth: 0.8,
            // paddingHorizontal: 20,
            // paddingVertical: 20,
            borderRadius: 15,
          }}
        >
          <TextInput
            value={sosMessage}
            onChangeText={(e) => setSosMessage(e)}
            style={{ paddingHorizontal: 10, paddingVertical: 10 }}
            numberOfLines={10}
            multiline
          />
        </View>
      </View>
      <View style={{ marginTop: 40, gap: 20 }}>
        <Text>Your SOS message</Text>
        <View
          style={{
            borderWidth: 0.8,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 15,
            gap: 10,
          }}
        >
          <Text>Your Name</Text>
          <Text>{sosMessage}</Text>
          <Text style={{ marginTop: 20 }}>My Last Location was:</Text>
          <Text style={{ textDecorationLine: "underline" }}>
            https://maps.google.com/maps?q={"latitude"},{"longitude"}
          </Text>
        </View>
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
  );
};

export default EditScreen;
