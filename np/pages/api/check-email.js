import pool from "@/lib/database";

// API的handler函數
export default async function handler(req, res) {
  const { email } = req.query;
  try {
    const exists = await checkEmailInDatabase(email);
    res.status(200).json({ exists });
  } catch (error) {
    // 如果查詢失敗，發送服務器錯誤狀態碼
    res.status(500).json({ message: "Database query failed" });
  }
}

// 檢查Email是否存在的函數
async function checkEmailInDatabase(email) {
  try {
    // 使用參數化查詢來避免SQL注入
    const [rows, fields] = await pool.query(
      "SELECT COUNT(*) AS count FROM member WHERE Email = ?",
      [email]
    );

    // 如果記數大於0，說明數據庫中存在該電子郵件
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error querying the database:", error);
    throw error; // 將錯誤拋出
  }
}
