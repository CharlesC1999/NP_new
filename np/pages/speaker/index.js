import React, { useState, useEffect } from "react";
// 先用 json 測試排版
// import data from "@/data/speaker.json";
import styles from "@/styles/speaker/index.module.scss";
import SpeakerCardVertical from "@/components/speaker/speaker-list/SpeakerCardVertical";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Pagination from "@/components/pagination";
import Footer from "@/components/Footer";

export default function Speaker() {
  // 初始化值
  // 講師資料庫data -> 物件陣列初始化值使用空陣列
  const [speakers, setSpeaker] = useState([]);
  // 分頁值
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);

  // !! 這個函數負責根據提供的分頁參數向後端 API 發送請求，獲取相應頁面的數據。
  const getSpeakers = async (params = {}) => {
    // params 是一個成對的鍵值，URLSearchParams()將其轉換為網址查詢參數的格式
    // 例如：params = { category: 'books', price: '10-20' }，轉換成查詢字串 category=books&price=10-20
    const searchParams = new URLSearchParams(params);
    const url = `http://localhost:3005/api/speakers?${searchParams.toString()}`;

    // 如果用了async-await，實務上習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      // if (Array.isArray(data.data.speakers)) {
      //   // 設定到狀態中
      // } else {
      //   console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      // }
      if (data.status === "success") {
        setPageCount(data.data.pageCount);
        setTotal(data.data.total);
        setSpeaker(data.data.speakersPage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 創建一個包含分頁信息的對象，page 和 perpage 分別表示當前頁碼和每頁顯示的項目數
  // 調用 getSpeakers 函數，並將 params 作為參數傳遞，這個函數負責根據提供的分頁參數向後端 API 發送請求，獲取相應頁面的食譜數據
  const handlePageChange = () => {
    const params = {
      page,
      perpage,
    };
    getSpeakers(params);
  };
  // 在組件加載時無參數地調用 getSpeakers，意味著獲取第一頁的數據或默認的數據集
  useEffect(() => {
    const params = {
          page,// 每次搜尋會返回第一頁
          perpage,
        };
    getSpeakers(params);
  }, []);
  //  每當 page 變量改變（用戶翻頁時），就調用 handlePageChange 函數以依據新的頁碼去獲取相應的數據
  useEffect(() => {
    handlePageChange();
    // getSpeakers();
  }, [page]);
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={styles.title}>
          <h3>講師陣容</h3>
        </div>
        <div className={styles.speakerCardContainer}>
          <div className={styles.speakerGroup}>
            {speakers.map((speaker) => {
              return (
                <SpeakerCardVertical
                  key={speaker.speaker_id}
                  id={speaker.speaker_id}
                  name={speaker.speaker_name}
                  title={speaker.speaker_title}
                  img={speaker.speaker_image}
                />
              );
            })}
          </div>
          {/* <Pagination pageCount={pageCount} perpage={perpage} onClick={handlePageChange} /> */}
          <div className="my-3">
        <button
          onClick={() => {
            // min is 1 (不能小於1)
            const newPageNow = page - 1 > 1 ? page - 1 : 1
            setPage(newPageNow)
          }}
        >
          上一頁
        </button>
        <button
          onClick={() => {
            // max is pageCount (不能大於總頁數)
            const newPageNow = page + 1 < pageCount ? page + 1 : pageCount
            setPage(newPageNow)
          }}
        >
          下一頁
        </button>
        <span className="mx-2">
          目前頁面: {page} / 總頁數: {pageCount} / 總項目數: {total}
        </span>
      </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
