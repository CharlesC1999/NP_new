import mysql from "mysql2/promise";
// 在 lib/database.js 或 utils/database.js
// Promise 版本允許您使用 JavaScript 的 async/await 語法
// import "dotenv/env";

const NPserver = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  //這個選項設定為 true 表示連接池將在沒有可用連接時等待（而不是立即拋出錯誤）
  connectionLimit: 1000,
  //這設定了連接池中的連接數量的上限，這裡設定為 1000。這意味著同時最多只能有 1000 個開放的連接。
  queueLimit: 0,
});

export default NPserver;
