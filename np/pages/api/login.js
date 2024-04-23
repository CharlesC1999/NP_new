// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "@/lib/database";

// async function 允許使用await
// req, res， req為請求對象， res為響應對象
export default async function handler(req, res) {
  const { username, password } = req.body;

  // try 塊開始，用於捕獲任何在執行期間可能出現的錯誤。
  try {
    const [rows] = await pool.query("SELECT * FROM member WHERE Account = ?", [
      username,
    ]);
    const user = rows[0];

    if (user && bcrypt.compareSync(password, user.Password)) {
      const token = jwt.sign(
        { id: user.id, username: user.User_name }, // 注意这里使用了正确的数据库字段
        "your-secret-key",
        { expiresIn: "25m" }
      );
      res.status(200).json({ token });
      // 驗證正確
    } else {
      res.status(401).json({ message: "Authentication failed" });
      // 驗證失敗
    }
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    // 資料庫連接錯誤
  }
}
