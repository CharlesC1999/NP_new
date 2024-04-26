import React, { useState, useEffect } from "react";
//  全域樣式
import "@/styles/globals.css";
//  Datepicker
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/class_styles/CustomDateTimePicker.css";
//  Contexts
import { AuthProvider } from "../contexts/AuthContext";
//  載入動畫context
import { LoaderProvider, useLoader } from "@/hooks/use-loader";
// 自訂用載入動畫元件
import { OrangeLoader } from "@/hooks/use-loader/components";
// loader樣式
import "@/styles/loader.scss";
//fontawesome
import "@fortawesome/fontawesome-free/css/all.css";
// Router
import Router from "next/router";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <LoaderProvider CustomLoader={OrangeLoader}>
        <ManageRouteChanges>
          {getLayout(<Component {...pageProps} />)}
        </ManageRouteChanges>
      </LoaderProvider>
    </AuthProvider>
  );
}

function ManageRouteChanges({ children }) {
  const { setLoading } = useLoader();

  React.useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [setLoading]);

  return children;
}
