import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cat from "@/components/member/Cat";
// axios
import axios from "axios";





// console.log('Ok')
// const getProducts = async (params = {}) => {
//   // 用URLSearchParams產生查詢字串
//   const searchParams = new URLSearchParams(params)
//   const url = `http://localhost:3005/api/testsql`

//   try {
//     const res = await fetch(url)
//     const data = await res.json()
//     console.log(data)

    // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render) ===> 顯示資料
//     if (data.status === 'success') {
//       setTotal(data.data.total)
//       setPageCount(data.data.pageCount)
//       setProducts(data.data.products)
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }









export default function MemberBuy() {
  const url = `http://localhost:3005/api/testCopy`

    const res =  fetch(url)
    console.log(res)
    return (
      <>
      
      </>
    );
  }