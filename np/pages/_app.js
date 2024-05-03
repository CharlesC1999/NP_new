import React, { useState, useEffect, useContext } from "react";

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

// Head
import Head from "next/head";

import { CartProvider } from "@/hooks/use-cart";
// 給食譜列表跟細節頁的sideBar用的context
import { CategoryForSQLProvider } from "@/hooks/recipe/use-categoryForSQL";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>NutriPolls</title>
      </Head>
      <AuthProvider>
        <LoaderProvider CustomLoader={OrangeLoader}>
          <CategoryForSQLProvider>
            <CartProvider>
              <ManageRouteChanges>
                {getLayout(<Component {...pageProps} />)}
              </ManageRouteChanges>
            </CartProvider>
          </CategoryForSQLProvider>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}
//暫時先擱置，右下角的那個光明會三角形

function ManageRouteChanges({ children }) {
  // 橘子奔跑指南
  const { setLoading } = useLoader();
  // 把橘子抓過來跑步，跑步方式如下
  useEffect(() => {
    const handleStart = () => {
      // 這裡是橘子跑起來的動作
      setLoading(true); //橘子，開跑!
    };
    const handleComplete = () => {
      // 這裡是橘子跑完的動作
      setLoading(false); //橘子，站住!
    };

    Router.events.on("routeChangeStart", handleStart);
    // 這裡是橘子在路徑開始改變時，走起
    Router.events.on("routeChangeComplete", handleComplete);
    // 這裡是橘子在路徑改變時，走完了(ㄌㄧㄠˇ)
    Router.events.on("routeChangeError", handleComplete);
    // 這裡是橘子在路徑改變時，走錯了(ㄌㄧㄠˇ)

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [setLoading]);

  return children;
}
