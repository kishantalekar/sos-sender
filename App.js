import Navigation from "./navigation/Navigation";
import { ToastProvider } from "react-native-toast-notifications";
//https://dribbble.com/goods/1513024-Emergency-SOS-Call-App-UI-Kit

export default function App() {
  return (
    <ToastProvider swipeEnabled={true} offsetBottom={120}>
      <Navigation />
    </ToastProvider>
  );
}
