import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import ContactScreen from "../Screens/ContactScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SettingScreen from "../Screens/SettingScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import EditScreen from "../Screens/EditScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import AboutUsScreen from "../Screens/AboutUsScreen";
import PoliciesScreen from "../Screens/PoliciesScreen";

function MyTabs() {
  const [contacts, setContacts] = useState([]);
  const setContactsfromContactScreen = (data) => {
    setContacts(data);
  };
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#5fa6b9",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} contacts={contacts} />}
      </Tab.Screen>
      <Tab.Screen
        name="Contacts"
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={25} />
          ),
        }}
      >
        {(props) => (
          <ContactScreen
            {...props}
            contacts={contacts}
            homeScreenSetContact={setContactsfromContactScreen}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={25} />
          ),
        }}
      >
        {(props) => <SettingScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="MainTab" component={MyTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutUsScreen} />
        <Stack.Screen name="Policy" component={PoliciesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
