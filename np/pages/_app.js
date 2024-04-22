import "@/styles/globals.css";
//  Datepicker
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/class_styles/CustomDateTimePicker.css";
//  Contexts
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
