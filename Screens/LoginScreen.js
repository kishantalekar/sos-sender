import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signIn } from "../api/AuthApi";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await signIn(email, password);
      if (res) {
        navigation.navigate("MainTab");
        toast.show("Login successfully", { type: "success" });
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // `user` will be null if the user is signed out
      // and will contain the user object if the user is signed in
      // setCurrentUser(user);
      // console.log(user, "from authchanged");
      // console.log(user, "from login screen");
      if (user) {
        navigation.navigate("MainTab");
      }
      setLoading(false);
    });
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>LOGIN </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            // secureTextEntry
            value={password}
            onChangeText={(e) => setPassword(e)}
            keyboardType="visible-password"
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.orSeparator}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>
        {/* 
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
 */}
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Need an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.loginLink}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  formContainer: {
    gap: 20,
    marginHorizontal: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
    borderRadius: 15,
    elevation: 6,
    marginTop: 60,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontWeight: "300",
    fontSize: 22,
  },
  input: {
    borderWidth: 0.8,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#ed5584",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 15,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "400",
    fontSize: 18,
  },
  orSeparator: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  line: {
    borderTopWidth: 0.8,
    flex: 1,
  },
  orText: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "gray",
    color: "gray",
    fontSize: 18,
  },
  googleButton: {
    alignItems: "center",
  },
  googleIcon: {
    height: 60,
    width: 60,
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  loginText: {
    fontWeight: "500",
    fontSize: 14,
    color: "gray",
  },
  loginLink: {
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 14,
    color: "gray",
  },
});

export default LoginScreen;
