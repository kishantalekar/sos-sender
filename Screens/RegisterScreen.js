import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signIn, signUp } from "../api/AuthApi";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSignUp = async () => {
    const res = await signUp(email, password);
    if (res) {
      //   alert("user is correct");
      navigation.navigate("MainTab");
    } else {
      alert("something went wrong");
    }
  };
  useEffect(() => {
    if (auth.currentUser !== null) {
      navigation.navigate("MainTab");
    }
  }, []);
  console.log(auth.currentUser !== null);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>SIGN UP </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
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
            secureTextEntry
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={styles.orSeparator}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line}></View>
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleIcon}
          />
        </TouchableOpacity>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
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
    fontSize: 28,
    fontFamily: "sans-serif",
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontWeight: "300",
    fontSize: 26,
  },
  input: {
    borderWidth: 0.8,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  signUpButton: {
    backgroundColor: "#ed5584",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
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
    fontSize: 20,
    color: "gray",
  },
  loginLink: {
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 20,
    color: "gray",
  },
});

export default RegisterScreen;
