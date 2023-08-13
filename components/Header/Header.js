import { View, Text, Image, StyleSheet, useAnimatedValue } from "react-native";
import React, { useEffect, useState } from "react";
import { getItem } from "../../storage/storage";
import { USERNAME } from "../../constants/storage";

const Header = () => {
  const [userName, setUsername] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const name = await getItem(USERNAME);
      setUsername(JSON.parse(name));
    };
    getData();
  }, []);
  console.log(userName);
  return (
    <View style={styles.container}>
      <View>
        {userName === null ? (
          <>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.name}>Stranger</Text>
          </>
        ) : (
          <>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.name}>{userName}</Text>
          </>
        )}
      </View>

      <Image
        source={require("../../assets/sos1.png")}
        style={styles.ProfileImage}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 35,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  ProfileImage: {
    width: 35,
    height: 35,
    borderRadius: 30,
    marginRight: 5,
  },
  welcomeText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
});
export default Header;
