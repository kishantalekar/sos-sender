import { GET_ALL_CONTACTS } from "../constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, item) => {
  try {
    const jsonValue = JSON.stringify(item);
    const result = await AsyncStorage.setItem(key, jsonValue);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getItem = (key) => {
  try {
    const data = AsyncStorage.getItem(key);
    return data || null;
  } catch (error) {
    console.log(error, "from database");
  }
};
export const setMyContacts = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(GET_ALL_CONTACTS, jsonValue);
  } catch (e) {
    // save error
    console.log(e);
  }
};
export const getContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GET_ALL_CONTACTS);
    if (jsonValue) {
      const parsedValue = JSON.parse(jsonValue);
      return parsedValue;
    }
  } catch (e) {
    console.log(e); // read error
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};
