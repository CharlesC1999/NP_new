import "@/styles/globals.css";
//  Datepicker
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/class_styles/CustomDateTimePicker.css";
//  Contexts
import { AuthProvider } from "../contexts/AuthContext";
//  載入動畫context
import { LoaderProvider } from "@/hooks/use-loader";
// 自訂用載入動畫元件
import { OrangeLoader } from "@/hooks/use-loader/components";
// loader樣式
import "@/styles/loader.scss";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page); // 提供默認佈局

  return (
    <AuthProvider>
      <LoaderProvider close={4} CustomLoader={OrangeLoader}>
        {getLayout(<Component {...pageProps} />)}
      </LoaderProvider>
    </AuthProvider>
  );
}
