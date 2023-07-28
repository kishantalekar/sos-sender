import { useToast } from "react-native-toast-notifications";

export const sendToast = (data) => {
  const toast = useToast();

  try {
    data?.forEach((message) => {
      if (message.includes("SMS sent successfully")) {
        toast.show(message, {
          type: "success",
          placement: "bottom",
          animationType: "slide-in",
        });
      } else if (message.includes("Failed to send SMS")) {
        toast.show(message, {
          type: "danger",
          placement: "bottom",
          animationType: "slide-in",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
