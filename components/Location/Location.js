import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const LocationComponent = ({
  location,
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  setLocation,
}) => {
  const [loading, setLoading] = useState(false);

  //getting location from the users location
  const getLocationAsync = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const options = {
      accuracy: Location.Accuracy.BestForNavigation,
      timeout: 10000, // 10 seconds timeout
    };

    try {
      const location = await Location.getCurrentPositionAsync(options);
      const { position } = location;
      // console.log(location, "from position");
      const { latitude, longitude } = location.coords;
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setLatitude(latitude);
      setLongitude(longitude);
      reverseGeocodeAsync(latitude, longitude);
    } catch (error) {
      console.log("Error getting location:", error);
    } finally {
      setLoading(false);
    }
  };
  //getting the location in words
  const reverseGeocodeAsync = async (latitude, longitude) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response.length > 0) {
        const address = response[0];
        // console.log("response", response);
        setLocation(address);
        // console.log("Address:", address);
      } else {
        console.log("No address found");
        getLocationAsync();
      }
    } catch (error) {
      console.log("Error reverse geocoding:", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);
  // console.log(location);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/sos2.png")}
        style={styles.profileImage}
      />
      <View style={styles.addressMain}>
        <Text style={styles.addressHeading}>Your current address:</Text>

        {loading ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <Text style={styles.currentAddress}>
            {location?.district} {location?.city} - {location?.postalCode}
          </Text>
        )}

        {!loading ? (
          location?.street && (
            <>
              <Text style={styles.currentAddress}>
                {location?.streetNumber}
                {location?.street}
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "400",
                  fontSize: 12,
                }}
              >
                {latitude} ,{longitude}
              </Text>
            </>
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: "row",
    marginHorizontal: 30,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    flex: 2,
    maxHeight: 120,
    marginBottom: 30,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8, // For Android
    // backgroundColor: "#edeff7",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 5,
    marginLeft: 5,
  },
  addressMain: {
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingBottom: 5,
    flex: 1,
    gap: 2,
  },
  addressHeading: {
    fontSize: 20,
    paddingBottom: 2,
  },
  currentAddress: {
    color: "black",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default LocationComponent;
