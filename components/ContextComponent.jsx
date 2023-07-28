import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const ContextComponent = () => {
  const [selectedContext, setSelectedContext] = useState([]);
  const contextArray = [
    "Accident",
    "Hospital",
    "Kidnapped",
    "Accident4",
    "Accident5",
    "Accident6",
  ];
  const ContextItem = ({ text, selectedContext, setSelectedContext }) => {
    const toggleValue = (value, array, setArray) => {
      if (array.includes(value)) {
        // Value exists in the array, remove it
        setArray((prev) => prev.filter((item) => item !== value));
      } else {
        // Value doesn't exist in the array, add it
        setArray((prev) => [...prev, value]);
      }
    };
    const handleToggle = (value) => {
      toggleValue(value, selectedContext, setSelectedContext);
    };
    return (
      <TouchableOpacity
        style={[
          styles.contextContainer,
          { borderColor: selectedContext.includes(text) ? "red" : "gray" },
        ]}
        onPress={() => handleToggle(text)}
      >
        <Text
          style={{
            color: "black",
            paddingHorizontal: 3,
            fontWeight: 600,
            fontSize: 18,
            fontFamily: "sans-serif",
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "gray",
          marginTop: 10,
          marginHorizontal: 20,
          padding: 0,
        }}
      ></View>
      {/* <Text
        style={{
          fontSize: 14,
          fontFamily: "sans-serif",
          paddingHorizontal: 20,
        }}
      >
        Capture What is going around you
      </Text> */}
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            justifyContent: "center",
            paddingHorizontal: 10,
            height: 50,
            borderStyle: "dotted",
          }}
        >
          <Text
            style={{
              fontWeight: 300,
              fontSize: 18,
              fontFamily: "sans-serif",
              color: "gray",
            }}
          >
            Add Context
          </Text>
        </View>

        {contextArray.map((context) => (
          <ContextItem
            key={context}
            text={context}
            setSelectedContext={setSelectedContext}
            selectedContext={selectedContext}
          />
        ))}
      </ScrollView>
      <Text
        style={{
          marginHorizontal: 10,
          fontSize: 12,
          fontWeight: 300,
          marginTop: -10,
          fontFamily: "sans-serif",
        }}
      >
        *Tell the responders what's is going around you
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  contextContainer: {
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "gray",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 50,
    // paddingHorizontal: 10,
    // backgroundColor: "#D21312",
  },
});

export default ContextComponent;
