import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const signIn = async (email, password) => {
  try {
    // console.log(email, password);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    const user = userCredential.user;
    // console.log(user);
    return userCredential.user;
  } catch (error) {
    console.log("Error signing in:", error.message);
    console.log(error);
  }
};

export const signUp = async (email, password) => {
  // console.log(typeof email, typeof password);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    const user = userCredential.user;
    // console.log(user);

    return userCredential.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onLogOut = async () => {
  try {
    const res = await signOut(auth);
    return res;
  } catch (error) {
    console.log(error);
  }
};
