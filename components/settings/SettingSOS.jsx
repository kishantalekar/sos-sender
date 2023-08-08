import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../../storage/storage";
import { COUNTDOWN_TIMER, GET_ALL_CONTACTS } from "../../constants/storage";

export default function SettingSOS({ Countdown, setCountdown }) {
  const navigation = useNavigation();
  const [totalNumbers, setTotalNumbers] = useState(0);
  const handleCountDown = async () => {
    try {
      await setItem(COUNTDOWN_TIMER, Countdown);
      const data = await getItem(COUNTDOWN_TIMER);
      // console.log(data, "from countdown");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCountDown();
  }, [Countdown]);

  useEffect(() => {
    const getData = async () => {
      const numbers = JSON.parse(await getItem(GET_ALL_CONTACTS));
      const cd = JSON.parse(await getItem(COUNTDOWN_TIMER));

      setCountdown(cd);
      setTotalNumbers(numbers.length);
    };
    getData();
  }, []);

  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: "gray", fontSize: 17, fontWeight: 400 }}>
          SOS
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
          <Text style={{ color: "#4892a6", fontSize: 16, fontWeight: 500 }}>
            Edit
          </Text>
        </TouchableOpacity>
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
        <View style={{ flexDirection: "row", gap: 20 }}>
          {/* <Ionicons name="person" size={24} color="#4e9cb1" /> */}
          <AntDesign name="message1" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 18 }}>SOS Message</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Ionicons name="timer" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 18, flex: 1 }}>SOS Send Countdown</Text>
          <TouchableOpacity onPress={() => setCountdown((prev) => prev + 1)}>
            <AntDesign name="pluscircleo" size={22} color="#4e9cb1" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 400, fontSize: 16 }}>{Countdown}s</Text>
          <TouchableOpacity
            style={{ paddingRight: 4 }}
            onPress={() =>
              setCountdown((prev) => (prev == 1 ? prev : prev - 1))
            }
          >
            <AntDesign name="minuscircleo" size={22} color="#4e9cb1" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {/* <Foundation
              name="telephone"
              size={24}
              color="#4e9cb1"
              style={{ paddingLeft: 5 }}
            /> */}
          <FontAwesome name="group" size={24} color="#4e9cb1" />
          <Text style={{ fontSize: 18 }}>
            Total Registered Numbers :{totalNumbers}
          </Text>
        </View>
      </View>
    </View>
  );
}
