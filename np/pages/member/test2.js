import { useState, useEffect } from 'react';
import Link from 'next/link';
// 第二階段: 使用範例資料
// 範例資料來源: https://my-json-server.typicode.com/eyesofkids/json-fake-data/products
// 先註解大概json的資料模型樣貌
// const data = [
//   {
//     id: '1',
//     picture: 'https://via.placeholder.com/150',
//     stock: 5,
//     name: 'iPhone 12 Pro',
//     price: 25000,
//     tags: '蘋果,大螢幕',
//   },
// ]

// 連至 /product/list 資料夾的路由
export default function List() {
  // 商品要使用的狀態
  // 物件陣列狀態大部份初始化值會使用至少空陣列
  // !!注意!! 初次render(渲染)會使用初始值
  // !!注意!! 在應用程式執行過程中，務必要保持狀態維持同樣的資料類型
  const [products, setProducts] = useState([]);

  // 與伺服器要求獲取資料的async函式
  const getProducts = async () => {
    const url = 'http://localhost:3005/api/ordertest2';

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.orders)) {
        // 設定到狀態中
        setProducts(data.data.orders);
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getProducts();
  }, []);

  return (
    <>
      <h1>Orders名單</h1>
      <ul>
        {products.map((v, i) => {
          return (
            <li key={v.Order_ID}>
              
                {v.Order_ID}/{v.Member_ID}/{v.Order_date}/{v.Status}/{v.Shipping_address}
              
            </li>
          );
        })}
      </ul>
    </>
  );
}
